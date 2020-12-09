CREATE TABLE [dbo].[Todo] (
    [ID]          INT            IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (MAX) NULL,
    [Deadline]    DATETIME2 (7)  NOT NULL,
    [Description] NVARCHAR (MAX) NULL,
    [Status]      NVARCHAR (MAX) NULL,
    [Priority]    INT            NOT NULL,
    CONSTRAINT [PK_Todo] PRIMARY KEY CLUSTERED ([ID] ASC)
);

