FROM budtmo/docker-android:emulator_11.0

# Install socat
USER root
RUN apt-get update && apt-get install -y socat && rm -rf /var/lib/apt/lists/*

# Set the entrypoint to run socat and then the original entrypoint script
USER androidusr
ENTRYPOINT ["sh", "-c", "socat TCP-LISTEN:5000,fork,reuseaddr TCP:backend:5000 & \
                          socat TCP-LISTEN:8080,fork,reuseaddr TCP:unigelogin:8080 & \
                          socat TCP-LISTEN:8000,fork,reuseaddr TCP:unigeapi:8000 & \
                          /home/androidusr/docker-android/mixins/scripts/run.sh"]
