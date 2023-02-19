composer install && npm install -y && php bin/console -n do:mi:mi && \
php bin/console do:qu:sql "INSERT INTO \"user\" (roles,password,login) VALUES('[\"ROLE_ADMIN\",\"ROLE_USER\"]','\$2y\$13\$cpQyh5.XtMonsiRFjzWc5ucQz.Hvwppl85Lnwp8LTBgxWzbkYruvK','admin');" && \
npm run build
