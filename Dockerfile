FROM resin/%%RESIN_MACHINE_NAME%%-node

COPY ./app /app

CMD ["node", "/app/index.js"]
