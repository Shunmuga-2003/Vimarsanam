FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy everything from repo root
COPY . .

RUN mvn clean install -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/movie-review-api-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]