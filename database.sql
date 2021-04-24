CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"notes" VARCHAR (500) NOT NULL,
	"completed" BOOLEAN DEFAULT 'No'
);

INSERT INTO "todo" ("notes", "completed")

	VALUES
			('Working on the weekend assignment for week 9', 'No'),
			('Working on the weekend assignment for week 8', 'Yes'),
			('Working on the weekend assignment for week 7', 'Yes'),
			('Pushing to level 90 in path of exile', 'No'),
			('Achieved Platinum in league of Legends', 'No');

SELECT * FROM "todo";