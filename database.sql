CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"notes" VARCHAR (500) NOT NULL,
	"completed" BOOLEAN DEFAULT 'False'
);

INSERT INTO "todo" ("notes", "completed")

	VALUES
			('Working on the weekend assignment for week 9', 'False'),
			('Working on the weekend assignment for week 8', 'False'),
			('Working on the weekend assignment for week 7', 'False'),
			('Pushing to level 90 in path of exile', 'True'),
			('Achieved Platinum in league of Legends', 'True');

SELECT * FROM "todo";