FROM openjdk:8
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "/demo.jar"]