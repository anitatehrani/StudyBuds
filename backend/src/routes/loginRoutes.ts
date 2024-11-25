// Node.js Example
import { Router } from "express";
import passport from "passport";
import { Strategy as SamlStrategy } from "passport-saml";
import { fetch, MetadataReader, toPassportConfig, claimsToCamelCase } from "passport-saml-metadata";
import jwt from "jsonwebtoken";

const router: Router = Router();

const url = process.env.IDP_METADATA;

async function getMetadata() {
    const reader = await fetch({ url });

    const config = toPassportConfig(reader);

    passport.use(
        new SamlStrategy(
            {
                ...config,
                entryPoint: process.env.IDP_ENTRYPOINT,
                issuer: "saml-poc",
                cert: config.idpCert,
                disableRequestedAuthnContext: true,
                validateInResponseTo: false,
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
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    res.redirect(`myapp://auth?token=${token}`);
});

export default router;
