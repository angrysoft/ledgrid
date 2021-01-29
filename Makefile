USR=http
GRP=http
PREFIX = /usr

all: buildjs buildcss

buildjs: canvas.ts
	tsc canvas.ts

buildjs: style.scss
	scss -t commpress style.scss style.min.css

install: index.html canvas.js style.min.css
	install -v -m 755  -g $(GRP) -o $(USR) -d $(DESTDIR)/var/www/ledgrid
	install -v -m 655 -g $(GRP) -o $(USR) index.html $(DESTDIR)/var/www/ledgrid/index.html
	install -v -m 655 -g $(GRP) -o $(USR) canvas.js $(DESTDIR)/var/www/ledgrid/canvas.js
	install -v -m 655 -g $(GRP) -o $(USR) style.min.css $(DESTDIR)/var/www/ledgrid/style.min.css
