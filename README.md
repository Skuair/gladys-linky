# Module Gladys Linky

Module compatible avec Gladys 3.X. Testé en 3.14.0.
Fork de https://github.com/pjap93/gladys-linky, modifié suite aux changements d'API de Enedis et utilisée par https://github.com/bokub/linky.

# Installation du module
 - Installer le module dans Gladys à l'aide du menu avancé (Nom, Version, URL Git, et slug) 

   Nom: Linky
   Version: 1.0.0
   URL Git: https://github.com/Skuair/gladys-linky.git
   Slug: linky
    
- Redémarrer Gladys

- Modifier les nouveaux paramètres 'LINKY_API_ACCESS_TOKEN', 'LINKY_API_REFRESH_TOKEN' et 'LINKY_API_POINT_ID' selon la description donnée par https://github.com/bokub/linky (tokens générés via https://conso.vercel.app/)

- Redémarrer à nouveau Gladys pour prendre en compte les nouveaux paramètres

# Fonctions
Mise à jours des données de consommation et de puissance maximum atteinte journalière toutes les 12 heures via l'API Enedis

# Notes
- Les tokens sont rafraîchis automatiquement lorsqu'ils sont périmés et les nouvelles valeurs sont mises à jour dans les paramètres 'LINKY_API_ACCESS_TOKEN' et 'LINKY_API_REFRESH_TOKEN' (c'est donc normal que les premiers tokens mis dans ces paramètres ne soient plus visibles après plusieurs lancements)
- Au premier lancement (ou si aucune donnée n'est encore trouvée dans Gladys), les 30 derniers jours sont récupérés
