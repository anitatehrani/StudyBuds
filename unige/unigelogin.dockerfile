FROM docker.io/kristophjunge/test-saml-idp

COPY ./authsources.php /var/www/simplesamlphp/config/authsources.php

