Dataset
The dataset used is Titanic-Dataset.csv, which includes the following columns:

PassengerId: Unique identifier for each passenger

Survived: Survival status (0 = No, 1 = Yes)

Pclass: Passenger class (1 = 1st, 2 = 2nd, 3 = 3rd)

Name: Passenger's name

Sex: Gender (male, female)

Age: Age of the passenger

SibSp: Number of siblings/spouses aboard

Parch: Number of parents/children aboard

Ticket: Ticket number

Fare: Ticket fare

Cabin: Cabin number

Embarked: Port of embarkation (C = Cherbourg, Q = Queenstown, S = Southampton)

Preprocessing Steps:
The notebook performs the following data cleaning and preprocessing steps:

Loading the Dataset:

The dataset is loaded using pandas  dataframe

Handling Missing Values:

Age: Missing values (177) are imputed with the mean age using SimpleImputer.
Embarked: Missing values (2) are imputed with the most frequent value (mode) using SimpleImputer.
Cabin: Dropped due to a high number of missing values (687 out of 891).
Dropping Irrelevant Columns:
Columns PassengerId, Name, Ticket, and Cabin are dropped as they are deemed irrelevant for modeling.

Encoding Categorical Variables:
Sex: Converted to binary values (male = 0, female = 1) using a mapping.
Embarked: One-hot encoded into three binary columns (Southampton, Cherbourg, Queenstown) using OneHotEncoder.

Scaling Numerical Features:
Age and Fare are scaled to the range [0, 1] using MinMaxScaler.

Log Transformation:
A log transformation is applied to the Fare column to reduce skewness, and the result is visualized in a histogram comparing the original and transformed distributions.

Automation with Pipelines:
Custom transformers (NameDropper, AgeEmbarkedImputer, FeatureEncoder) are defined using scikit-learn's BaseEstimator and TransformerMixin to automate the preprocessing steps.

Visualization:
Histograms are plotted to compare the distribution of Fare before and after log transformation.

Final Dataset
The preprocessed dataset contains the following columns:

Survived: Target variable (0 or 1)
Pclass: Passenger class (1, 2, or 3)
Sex: Binary-encoded gender (0 or 1)
Age: Scaled age (0 to 1)
SibSp: Number of siblings/spouses
Parch: Number of parents/children
Fare: Scaled fare (0 to 1)
Southampton, Cherbourg, Queenstown: One-hot encoded columns for embarkation port