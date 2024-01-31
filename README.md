 Dokumentation av vår Backend server 

Säkerhetsfunktioner:
Vi har implementerat säkerhetsåtgärder för att skydda vår applikation och dess användare: 

Helmet : för att skydda vår server från webbsäkerhetssårbarheter

Cors: tillåter säkra cross-rgin förfrågningar från vår definerade frontend 

Cookie-Parser: Hanterar säkra cookies för att lagra JWT och hantera sessioner 

dotenv: Använder miljövariabler för att säkert hantera konfiguration



server.js: konfigurerar vår express-server med nödvändiga middleware, inklusive genm helmet och Cors för säker kommunikation

service.js : ansvarar för starta servern och lyssnar på inkommande förfrågningar 

data_routes.js: definerar routes för att hantera dataförfrågningar

env: innehåller miljövariabler som hjälper till att hålla känsliga information




