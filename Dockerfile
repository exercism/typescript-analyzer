FROM node:lts-alpine as builder

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
FROM node:lts-alpine
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /typescript-analyzer/package.json /opt/analyzer/package.json
COPY --from=builder /typescript-analyzer/bin /opt/analyzer/bin
COPY --from=builder /typescript-analyzer/dist /opt/analyzer/dist
COPY --from=builder /typescript-analyzer/production_node_modules /opt/analyzer/node_modules
USER appuser
WORKDIR /opt/analyzer
ENTRYPOINT ["/opt/analyzer/bin/analyze.sh"]
