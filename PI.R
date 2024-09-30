library(MASS)
projet <- read.csv("C:\\users\\user\\Desktop\\projet.csv")
View(projet)
projets<- subset(projet, select = -c(id,Project,Transactions, YearEnd,PointsNonAdjust,Adjustment,PointsAjust))
View(projets)
reg <- lm(Effort ~ .,data=projets)
print(reg)
View(reg)
summary(projets) 
plot(reg)



reg.reduit<-stepAIC((reg))
summary(reg.reduit)
predict(reg, newdata=data.frame(TeamExp =4,ManagerExp=4,Length=12,Entities=269,Language=2),se.fit = TRUE,interval = "prediction",level = 0.99)
y=predict(reg, newdata=data.frame(TeamExp =4,ManagerExp=4,Length=12,Entities=269,Language=2))
y1=predict(reg.reduit, newdata=data.frame(TeamExp =1,ManagerExp=1,Length=9,Entities=38,Language=2))

rmse <- sqrt(mean((projet$Effort - predict(reg, newdata = projets))^2))

# Erreur absolue moyenne (MAE)
mae <- mean(abs(projet$Effort - predict(reg, newdata = projets)))

# Coefficient de détermination (R²)
r_squared <- summary(reg)$r.squared

# Erreur relative (Mean Percentage Error - MPE)
mpe <- mean((projet$Effort - predict(reg, newdata = projets)) / projet$Effort) * 100

# Erreur quadratique moyenne relative (RMSE %)
rmse_percent <- sqrt(mean(((projet$Effort - predict(reg, newdata = projets)) / projet$Effort)^2)) * 100

# Afficher les résultats
cat("RMSE:", rmse, "\n")
cat("MAE:", mae, "\n")
cat("R-squared:", r_squared, "\n")
cat("MPE:", mpe, "%\n")
cat("RMSE %:", rmse_percent, "%\n")
