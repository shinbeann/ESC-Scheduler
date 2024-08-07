CREATE TABLE HR (
    hrId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hpNum INT NOT NULL
);

CREATE TABLE HOD (
    hodId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hpNum INT NOT NULL,
    hrId INT,
    FOREIGN KEY (hrId) REFERENCES HR(hrId)
);

CREATE TABLE Department (
    departmentId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL
);

CREATE TABLE Designation (
    designationId INT AUTO_INCREMENT PRIMARY KEY,
    position VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    super VARCHAR(255)
);

CREATE TABLE Staff (
    staffId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    departmentId INT,
    designationId INT,
    firebase_uid VARCHAR(255) UNIQUE,
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId),
    FOREIGN KEY (designationId) REFERENCES Designation(designationId)
);

CREATE TABLE Skill (
    skillId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Course (
    courseId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    providerName VARCHAR(255) NOT NULL
);

CREATE TABLE Training (
    trainingId INT AUTO_INCREMENT PRIMARY KEY,
    grade CHAR(1),
    startDate DATETIME NOT NULL,
    endDate DATETIME NOT NULL,
    completedDate DATETIME,
    staffId INT,
    courseId INT,
    FOREIGN KEY (staffId) REFERENCES Staff(staffId),
    FOREIGN KEY (courseId) REFERENCES Course(courseId)
);

CREATE TABLE CoursePlan (
    coursePlanId INT AUTO_INCREMENT PRIMARY KEY,
    startDate DATETIME NOT NULL,
    endDate DATETIME NOT NULL,
    trainingId INT,
    FOREIGN KEY (trainingId) REFERENCES Training(trainingId)
);

CREATE TABLE TrainingRequest (
    requestId INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    generatedDate DATE NOT NULL,
    reasons VARCHAR(255) NOT NULL,
    departmentId INT,
    staffId INT,
    FOREIGN KEY (departmentId) REFERENCES Department(departmentId),
    FOREIGN KEY (staffId) REFERENCES Staff(staffId)
);

CREATE TABLE Report (
    reportId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    generatedDate DATETIME NOT NULL,
    file BLOB
);


INSERT INTO Department (departmentId, name,location) VALUES 
(202, 'Training','somewhere location'),
(208, 'Machining','somewhere location 2');

INSERT INTO Designation (designationId, position) VALUES 
(609, 'Planner'),
(604, 'CNC Machinist');

INSERT INTO Staff (staffId, name, email, departmentId, designationId, firebase_uid) VALUES 
(1, 'Javier Tan', 'javiertan@TSH.com', 202, 609, 'o6rYQBa57eg3tKhOl6JXuka5z2Q2'),
(2, 'Vivian Quek', 'QuekVivian@TSH.com', 208, 604, 'ezR4WIByt2QVB60HStWNM1qAamf2');

INSERT INTO TrainingRequest (type, department_name, course_name) VALUES 
('Internal', 'Engineering', 'ERP Basics'),
('External', 'Sales', 'Microsoft Office Advanced');

INSERT INTO Training (staff_id, request_id, attended) VALUES 
(2, 2, TRUE),
(3, 3, FALSE),
(1, 2, TRUE);