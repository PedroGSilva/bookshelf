DROP TABLE USER;
CREATE TABLE USER (
	IP TEXT PRIMARY KEY NOT NULL,
	FOREIGN KEY (IP) REFERENCES RATE(IP)
);

DROP TABLE RATE;
CREATE TABLE RATE (
	RATE_ID PRIMARY KEY NOT NULL,
	IP TEXT NOT NULL,
	BOOK_ID INT NOT NULL,
	LIKES INT NOT NULL,
	DISLIKES INT NOT NULL,
	FOREIGN KEY (IP) REFERENCES USER(IP),
	FOREIGN KEY (BOOK_ID) REFERENCES BOOKS(BOOK_ID)
);

DROP TABLE BOOKS;
CREATE TABLE BOOKS (
	BOOK_ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	ISBN INT NOT NULL,
	TITLE TEXT NOT NULL,
	FOREIGN KEY (BOOK_ID) REFERENCES RATE(BOOK_ID)
);
--Teste: Inserir values em cada tabela
INSERT INTO BOOKS(ISBN,TITLE) 
VALUES(98765,'Hidden Figures');
INSERT INTO BOOKS(ISBN,TITLE) 
VALUES(98734,'Harry Potter');
INSERT INTO BOOKS(ISBN,TITLE) 
VALUES(98703,'Fantastic Beasts');
SELECT * FROM BOOKS;-----------------------------------

INSERT INTO RATE(RATE_ID,IP,BOOK_ID,LIKES,DISLIKES) 
VALUES(1,'128.0.0.1',1,0,1);
INSERT INTO RATE(RATE_ID,IP,BOOK_ID,LIKES,DISLIKES) 
VALUES(2,'128.0.0.2',2,1,0);
INSERT INTO RATE(RATE_ID,IP,BOOK_ID,LIKES,DISLIKES) 
VALUES(3,'128.0.0.1',3,0,1);
INSERT INTO RATE(RATE_ID,IP,BOOK_ID,LIKES,DISLIKES) 
VALUES(4,'128.0.0.3',1,1,0);
INSERT INTO RATE(RATE_ID,IP,BOOK_ID,LIKES,DISLIKES) 
VALUES(5,'128.0.0.1',2,0,1);
INSERT INTO RATE(RATE_ID,IP,BOOK_ID,LIKES,DISLIKES) 
VALUES(6,'128.0.0.2',1,0,1);
SELECT * FROM RATE;-----------------------------------

INSERT INTO USER(IP) 
VALUES('128.0.0.1');
INSERT INTO USER(IP) 
VALUES('128.0.0.2');
INSERT INTO USER(IP) 
VALUES('128.0.0.3');
SELECT * FROM USER;-----------------------------------

--Aqui consigo saber o RATE de cada LIVRO
SELECT BOOKS.BOOK_ID,BOOKS.TITLE,BOOKS.ISBN,SUM(RATE.LIKES),SUM(RATE.DISLIKES) 
FROM BOOKS  
JOIN RATE ON BOOKS.BOOK_ID = RATE.BOOK_ID 
GROUP BY BOOKS.BOOK_ID;

/* Resultado da query acima
BOOK_ID     TITLE           ISBN        SUM(RATE.LIKES)  SUM(RATE.DISLIKES)
----------  --------------  ----------  ---------------  ------------------
1           Hidden Figures  98765       1                1                 
2           Harry Potter    98734       1                0                 
3           Fantastic Beas  98703       0                1                 
*/

-- Agora vamos apagar tudo para podermos implementar
DELETE FROM RATE;
















