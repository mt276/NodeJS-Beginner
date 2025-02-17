# 1. Sử dụng image Node.js chính thức, version node22/alpine (giúp giảm dung lượng thư viện không cần thiết của nodejs)
FROM node:22-alpine
# 2. Thiết lập thư mục làm việc trong container
WORKDIR /app
# 3. Copy package.json và package-lock.json trước để tối ưu cache
COPY package*.json ./
# 4. Cài đặt dependencies
RUN npm install
# Bỏ qua devDependencies nếu chạy production
##RUN npm install --omit=dev  
# 5. Copy toàn bộ mã nguồn vào container
COPY . .
# 6. Mở cổng ứng dụng (tùy vào app của bạn)
EXPOSE 8080
# 7. Khởi chạy ứng dụng
CMD ["node", "server.js"]

# Chạy các câu lệnh sau
# Build image
## docker build -t nodejs-beginner .
### -t my-node-app đặt tên cho image
# Chạy container
##docker run -p 8080:8080 my-node-app
###-p 8080:8080 ánh xạ cổng từ container ra máy host.

