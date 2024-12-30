FROM nginx:alpine

# Mevcut nginx konfigürasyonunu kaldır
RUN rm -rf /usr/share/nginx/html/*

# Tüm proje dosyalarını container'a kopyala
COPY . /usr/share/nginx/html/

# Dosya izinlerini ayarla
RUN chmod -R 755 /usr/share/nginx/html

# Nginx konfigürasyonunu kopyala (opsiyonel)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]