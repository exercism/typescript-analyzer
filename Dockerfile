# sha256:a0b9bf06e4e6193cf7a0f58816cc935ff8c2a908f81e6f1a95432d679c54fbfd => node:24.18.0-alpine3.24
FROM node:lts-alpine@sha256:a0b9bf06e4e6193cf7a0f58816cc935ff8c2a908f81e6f1a95432d679c54fbfd AS builder

# Install SSL ca certificates
RUN apk update && apk add ca-certificates

# Create appuser
RUN adduser -D -g '' appuser

# get the source code
WORKDIR /typescript-analyzer
COPY . .

# Install without arguments runs yarn prepublish
RUN yarn install

# Only install the node_modules we need
RUN yarn install --production --modules-folder './production_node_modules'

# Build a minimal and secured container
FROM node:lts-alpine3.23@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /typescript-analyzer/package.json /opt/analyzer/package.json
COPY --from=builder /typescript-analyzer/bin /opt/analyzer/bin
COPY --from=builder /typescript-analyzer/dist /opt/analyzer/dist
COPY --from=builder /typescript-analyzer/production_node_modules /opt/analyzer/node_modules
USER appuser
WORKDIR /opt/analyzer
ENTRYPOINT ["/opt/analyzer/bin/analyze.sh"]
