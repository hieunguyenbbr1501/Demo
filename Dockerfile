FROM openjdk:8
EXPOSE 8081
ADD build/libs/demo-0.0.1-SNAPSHOT.jar demo.jar
ENTRYPOINT ["java", "-jar", "/demo.jar"]