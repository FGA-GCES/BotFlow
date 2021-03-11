FROM node:10-jessie-slim 

RUN mkdir /botflow
WORKDIR /botflow
COPY ./app .
COPY /app/package.json .
EXPOSE 3000
CMD ["sh", "-c", "yarn install && yarn start"] 