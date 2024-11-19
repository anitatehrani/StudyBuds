FROM alpine
RUN apk add --no-cache yq
CMD ["sh","-c","yq -ojson . \"$IN\" > \"$OUT\""]
