import passport from "passport";
import { Strategy as SamlStrategy } from "@node-saml/passport-saml";
import { fetch, toPassportConfig } from "passport-saml-metadata";
import jwt from "jsonwebtoken";
import { ENTITY_ID, IDP_ENTRYPOINT, IDP_METADATA } from "../config/unigeapi";
import { JWT_SECRET } from "../config/secrets";
import { Request, Response, Router } from "express";

const router: Router = Router();


async function getMetadata() {
    const reader = await fetch({ url: IDP_METADATA });

    const config = toPassportConfig(reader);

    passport.use(
        new SamlStrategy(
            {
                ...config,
                entryPoint: IDP_ENTRYPOINT,
                callbackUrl: "l", // it has to be not empty string | unused
                issuer: ENTITY_ID,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                idpCert: config.idpCert,
                disableRequestedAuthnContext: true,
            },
            function (profile: unknown, done: (error: null, user?: unknown) => void) {
                return done(null, profile);
            },
            function (profile: unknown, done: (error: null, user?: unknown) => void) {
                return done(null, profile);
            }
        )
    );
}

getMetadata().catch(console.error);

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.get("/", passport.authenticate("saml"));

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.post("/", passport.authenticate("saml", { session: false }), (req:Request, res:Response) => {
    const token = jwt.sign({ user: req.user }, JWT_SECRET, { expiresIn: "1h" });
    res.redirect(`myapp://auth?token=${token}`);
});

export default router;
