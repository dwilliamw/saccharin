CREATE TABLE [dbo].[MaleBmi] (
    [Age_group]                  VARCHAR (50)  NOT NULL,
    [Gender]                     VARCHAR (50)  NOT NULL,
    [Year]                       INT           NOT NULL,
    [Underweight]                VARCHAR (50)  NOT NULL,
    [Normal_range_i]             VARCHAR (50)  NOT NULL,
    [Normal_range_ii]            VARCHAR (50)  NOT NULL,
    [Total_normal_range]         VARCHAR (50)  NOT NULL,
    [Overweight]                 VARCHAR (MAX) NOT NULL,
    [Obesity_class_i]            VARCHAR (50)  NOT NULL,
    [Obesity_class_ii]           VARCHAR (50)  NOT NULL,
    [Obesity_class_iii]          VARCHAR (50)  NOT NULL,
    [Total_obese]                VARCHAR (50)  NOT NULL,
    [Total_overweight_and_obese] VARCHAR (50)  NOT NULL,
    PRIMARY KEY CLUSTERED ([Age_group] ASC)
);
GO
CREATE TABLE [dbo].[FemaleBmi] (
    [Age_group]                  VARCHAR (50)  NOT NULL,
    [Gender]                     VARCHAR (50)  NOT NULL,
    [Year]                       INT           NOT NULL,
    [Underweight]                VARCHAR (50)  NOT NULL,
    [Normal_range_i]             VARCHAR (50)  NOT NULL,
    [Normal_range_ii]            VARCHAR (50)  NOT NULL,
    [Total_normal_range]         VARCHAR (50)  NOT NULL,
    [Overweight]                 VARCHAR (MAX) NOT NULL,
    [Obesity_class_i]            VARCHAR (50)  NOT NULL,
    [Obesity_class_ii]           VARCHAR (50)  NOT NULL,
    [Obesity_class_iii]          VARCHAR (50)  NOT NULL,
    [Total_obese]                VARCHAR (50)  NOT NULL,
    [Total_overweight_and_obese] VARCHAR (50)  NOT NULL,
    PRIMARY KEY CLUSTERED ([Age_group] ASC)
);