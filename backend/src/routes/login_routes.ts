// Node.js Example
import { Router } from "express";
import passport from "passport";
import { Strategy as SamlStrategy } from "@node-saml/passport-saml";
import { fetch, MetadataReader, toPassportConfig, claimsToCamelCase } from "passport-saml-metadata";
import jwt from "jsonwebtoken";
import { ENTITY_ID, IDP_ENTRYPOINT, IDP_METADATA } from "../config/unigeapi";
import { JWT_SECRET } from "../config/secrets";

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
                idpCert: config.idpCert,
                disableRequestedAuthnContext: true,
            },
            function (profile: any, done: (error: any, user?: any) => void) {
                return done(null, profile);
            },
            function (profile: any, done: (error: any, user?: any) => void) {
                return done(null, profile);
            }
        )
    );
}

getMetadata();

router.get("/", passport.authenticate("saml"));

router.post("/", passport.authenticate("saml", { session: false }), (req, res) => {
    const token = jwt.sign({ user: req.user }, JWT_SECRET, { expiresIn: "1h" });
    res.redirect(`myapp://auth?token=${token}`);
});

export default router;
