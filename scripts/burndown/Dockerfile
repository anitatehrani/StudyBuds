FROM alpine:latest

RUN apk add --no-cache github-cli jq yq npm
RUN npm install -g vega-lite

WORKDIR /app
COPY filter.jq plot.yml run.sh ./

ENTRYPOINT [ "/bin/sh", "./run.sh" ]
CMD []
