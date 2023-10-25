FROM node:21.1.0-bullseye-slim

EXPOSE 3000

ENV LC_ALL=C.UTF-8

RUN apt-get update && \
  apt-get install -y \
  apt-utils \
  curl \
  jq \
  git \
  sudo

RUN npm install -g npm@9 @antfu/ni

ENV UNAME=docker
ENV GID=1000
ENV UID=1001

RUN groupadd -g $GID -o $UNAME
RUN useradd -m -u $UID -g $GID -G sudo -o -s /bin/bash $UNAME
RUN echo "$UNAME ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER $UNAME
