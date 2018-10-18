FROM nginx
MAINTAINER chaos@xuyuanxiang.cn
COPY dist/index.html /usr/share/nginx/html
COPY app.nginx /etc/nginx/conf.d/default.conf
COPY conf.nginx /etc/nginx/nginx.conf
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo Asia/Shanghai > /etc/timezone \
  && dpkg-reconfigure -f noninteractive tzdata
EXPOSE 80
