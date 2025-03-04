USE [master]
GO
CREATE DATABASE [AmosDanielDataB]
GO
ALTER DATABASE [AmosDanielDataB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET ARITHABORT OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [AmosDanielDataB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [AmosDanielDataB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [AmosDanielDataB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [AmosDanielDataB] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [AmosDanielDataB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET RECOVERY FULL 
GO
ALTER DATABASE [AmosDanielDataB] SET  MULTI_USER 
GO
ALTER DATABASE [AmosDanielDataB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [AmosDanielDataB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [AmosDanielDataB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [AmosDanielDataB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [AmosDanielDataB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [AmosDanielDataB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'AmosDanielDataB', N'ON'
GO
ALTER DATABASE [AmosDanielDataB] SET QUERY_STORE = ON
GO
ALTER DATABASE [AmosDanielDataB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [AmosDanielDataB]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 18/02/2025 10:14:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Addresses]    Script Date: 18/02/2025 10:14:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Addresses](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[City] [nvarchar](max) NOT NULL,
	[Street] [nvarchar](max) NOT NULL,
	[CustomerId] [int] NOT NULL,
	[AddressTypesID] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[Created] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Addresses] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AddressTypes]    Script Date: 18/02/2025 10:14:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AddressTypes](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[AddressTypeName] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_AddressTypes] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contacts]    Script Date: 18/02/2025 10:14:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contacts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](max) NOT NULL,
	[OfficeNumber] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
	[CustomerId] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[Created] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Contacts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customers]    Script Date: 18/02/2025 10:14:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[CustomerNumber] [nvarchar](max) NULL,
	[CustomerTypeID] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[Created] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Customers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CustomerTypes]    Script Date: 18/02/2025 10:14:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomerTypes](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerTypeName] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_CustomerTypes] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250218071249_InitialSYSMCLTDCreate2025', N'9.0.2')
GO
SET IDENTITY_INSERT [dbo].[AddressTypes] ON 

INSERT [dbo].[AddressTypes] ([ID], [AddressTypeName]) VALUES (2, N'Home ')
INSERT [dbo].[AddressTypes] ([ID], [AddressTypeName]) VALUES (1, N'Office')
SET IDENTITY_INSERT [dbo].[AddressTypes] OFF
GO
SET IDENTITY_INSERT [dbo].[CustomerTypes] ON 

INSERT [dbo].[CustomerTypes] ([ID], [CustomerTypeName]) VALUES (1, N'Business ')
INSERT [dbo].[CustomerTypes] ([ID], [CustomerTypeName]) VALUES (2, N'Private')
SET IDENTITY_INSERT [dbo].[CustomerTypes] OFF
GO
/****** Object:  Index [IX_Addresses_CustomerId]    Script Date: 18/02/2025 10:14:54 ******/
CREATE NONCLUSTERED INDEX [IX_Addresses_CustomerId] ON [dbo].[Addresses]
(
	[CustomerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AddressTypes]    Script Date: 18/02/2025 10:14:54 ******/
CREATE NONCLUSTERED INDEX [IX_AddressTypes] ON [dbo].[AddressTypes]
(
	[AddressTypeName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Contacts_CustomerId]    Script Date: 18/02/2025 10:14:54 ******/
CREATE NONCLUSTERED INDEX [IX_Contacts_CustomerId] ON [dbo].[Contacts]
(
	[CustomerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_CustomerTypes]    Script Date: 18/02/2025 10:14:54 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_CustomerTypes] ON [dbo].[CustomerTypes]
(
	[CustomerTypeName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Addresses] ADD  CONSTRAINT [DF_Addresses_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Addresses] ADD  CONSTRAINT [DF_Addresses_Created]  DEFAULT (getdate()) FOR [Created]
GO
ALTER TABLE [dbo].[Contacts] ADD  CONSTRAINT [DF_Contacts_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Contacts] ADD  CONSTRAINT [DF_Contacts_Created]  DEFAULT (getdate()) FOR [Created]
GO
ALTER TABLE [dbo].[Customers] ADD  CONSTRAINT [DF_Customers_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Customers] ADD  CONSTRAINT [DF_Customers_Created]  DEFAULT (getdate()) FOR [Created]
GO
ALTER TABLE [dbo].[Addresses]  WITH CHECK ADD  CONSTRAINT [FK_Addresses_AddressTypes_AddressTypesID] FOREIGN KEY([AddressTypesID])
REFERENCES [dbo].[AddressTypes] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Addresses] CHECK CONSTRAINT [FK_Addresses_AddressTypes_AddressTypesID]
GO
ALTER TABLE [dbo].[Addresses]  WITH CHECK ADD  CONSTRAINT [FK_Addresses_Customers_CustomerId] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Addresses] CHECK CONSTRAINT [FK_Addresses_Customers_CustomerId]
GO
ALTER TABLE [dbo].[Contacts]  WITH CHECK ADD  CONSTRAINT [FK_Contacts_Customers_CustomerId] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Contacts] CHECK CONSTRAINT [FK_Contacts_Customers_CustomerId]
GO
ALTER TABLE [dbo].[Customers]  WITH CHECK ADD  CONSTRAINT [FK_Customers_CustomerTypes_CustomerTypeID] FOREIGN KEY([CustomerTypeID])
REFERENCES [dbo].[CustomerTypes] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Customers] CHECK CONSTRAINT [FK_Customers_CustomerTypes_CustomerTypeID]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'A customer id as index it to optimize search queries and actions.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Addresses', @level2type=N'INDEX',@level2name=N'IX_Addresses_CustomerId'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'A unique address type name, so we index it to optimize search queries and actions.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'AddressTypes', @level2type=N'INDEX',@level2name=N'IX_AddressTypes'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'A unique customer type name, so we index it to optimize search queries and actions.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CustomerTypes', @level2type=N'INDEX',@level2name=N'IX_CustomerTypes'
GO
USE [master]
GO
ALTER DATABASE [AmosDanielDataB] SET  READ_WRITE 
GO
