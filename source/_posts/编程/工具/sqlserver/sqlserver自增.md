---
title: sqlserver
tags:
  - sqlserver
  - 数据库
categories:
  - 编程
  - 工具
  - sqlserver
date: 2023-01-30 09:50:52
---

# sqlserver设置自增

### 已经创建了表，如何设置自增

> 以下为模板，注意占位符${}和注释--处，替换即可
>
> ${tableName}：表名
>
> ${columnName}：自增字段

##### 删掉表，重建（可保留数据）

```sql
--重建新表
CREATE TABLE dbo.Tmp_${tableName}(
    ${colomnName} int NOT NULL IDENTITY (1, 1),  
    --other columns
)  ON [PRIMARY];
SET IDENTITY_INSERT dbo.Tmp_${tableName} ON;
--将原表的数据转移到新表
IF EXISTS(SELECT * FROM dbo.${tableName})
	INSERT INTO dbo.Tmp_${tableName} (${columnName}, --other columns which need to save data
	) SELECT ${columnName}, --other columns which need to save data
    FROM dbo.${tableName} TABLOCKX;
SET IDENTITY_INSERT dbo.Tmp_${tableName} OFF;
--删掉
DROP TABLE dbo.${tableName};
--改名
Exec sp_rename 'Tmp_${tableName}', '${tableName}';
```

##### 删掉原来的字段

- 数据不保留
- 如果字段是主键会报错

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

