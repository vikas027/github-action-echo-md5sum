# Base image
FROM vikas027/alpine:minimal

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
