---
title: sqlserver设置、添加、修改自增字段
tags:
  - sqlserver
  - 数据库
categories:
  - 数据库
  - sqlserver
date: 2023-01-30 09:50:52
---
hello world

---

[toc]



> 以下为模板，注意占位符${}和注释--处，替换即可
>
> ${tableName}：表名
>
> ${columnName}：自增字段

### 建表时，设置自增

字段后面加上 `identity(<起始值>,<每次自增多少>)`

```sql
CREATE TABLE ${tableName}(
    ${colomnName} int NOT NULL IDENTITY (1, 1),  
    --other columns
)  ON [PRIMARY];
```

自增的字段==允许手动insert==，甚至可以insert重复值

```sql
SET IDENTITY_INSERT ${tableName} ON;--设置允许手动insert
insert into ${tableName}(${colomnName}) values(111);
insert into ${tableName}(${colomnName}) values(111);--可重复
SET IDENTITY_INSERT ${tableName} OFF;--关闭，这一步别忘了
```

但是==不允许update==

### 已经创建了表，如何设置自增

sqlserver**不允许**把现有的字段设置成自增

##### 删掉表，重建（可保留数据）

```sql
--创建一张新表，带自增的
CREATE TABLE dbo.Tmp_${tableName}(
    ${colomnName} int NOT NULL IDENTITY (1, 1),  
    --other columns
)  ON [PRIMARY];
--将原表的数据转移到新表
SET IDENTITY_INSERT dbo.Tmp_${tableName} ON;
IF EXISTS(SELECT * FROM dbo.${tableName})
	INSERT INTO dbo.Tmp_${tableName} (${columnName}, --other columns that need to save data
	) SELECT ${columnName}, --other columns that need to save data
    FROM dbo.${tableName} TABLOCKX;
SET IDENTITY_INSERT dbo.Tmp_${tableName} OFF;
--删掉旧表
DROP TABLE dbo.${tableName};
--新表改名
Exec sp_rename 'Tmp_${tableName}', '${tableName}';
```

##### 删掉原来的字段

- 数据不保留，因为自增列不能update
- ==如果该字段是主键会报错==

```sql
--插入新列
Alter Table ${tableName} Add ${columnName}_new Int Identity(1,1);
--删除旧列
Alter Table ${tableName} Drop Column ${columnName};
--新列改名
Exec sp_rename '${tableName}.${columnName}_new', '${columnName}','Column';
```

同时删掉主键版本

```sql
--插入新列
Alter Table ${tableName} Add ${columnName}_new Int Identity(1,1);
--先删掉旧的主键
DECLARE @SQL VARCHAR(4000);
SET @SQL = 'ALTER TABLE ${tableName} DROP CONSTRAINT |ConstraintName| ';
--动态获取主键名
SET @SQL = REPLACE(@SQL, '|ConstraintName|', ( SELECT name FROM sysobjects WHERE xtype = 'PK' AND parent_obj = OBJECT_ID('${tableName}')));

EXEC (@SQL);
--此时可以正常删除旧列
Alter Table ${tableName} Drop Column ${columnName};
--新列改名
Exec sp_rename '${tableName}.${columnName}_new', '${columnName}','Column';

--设置为primary key
ALTER TABLE [dbo].[${tableName}] ADD PRIMARY KEY CLUSTERED ([${columnName}])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON);
```

