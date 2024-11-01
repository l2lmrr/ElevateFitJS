# ElevateFit - Front-end Development Project

## Contexte du Projet

**Objectif :**  
Nous recherchons un développeur Front-end compétent pour rendre le site **ElevateFit** réactif en ajoutant des breakpoints et en intégrant des composants interactifs afin d'améliorer l'engagement des utilisateurs.

---

## User Stories

### 1. Page de Produits
- En tant qu'utilisateur, je veux pouvoir voir une liste de vêtements, avec la possibilité de filtrer par catégorie pour trouver les articles qui m'intéressent.
- En tant qu'utilisateur, je souhaite pouvoir filtrer les vêtements par plage de prix afin de voir seulement les articles dans mon budget.
- En tant qu'utilisateur, je souhaite que le bouton "Ajouter au panier" ait un effet "hover" pour confirmer visuellement mon action.

### 2. Page de Détail Produit
- En tant qu'utilisateur, je veux pouvoir cliquer sur un vêtement pour voir ses détails, comme le prix, la description, les images et les avis clients, afin d'obtenir plus d'informations avant de décider d'acheter.

### 3. Page de Panier
- En tant qu'utilisateur, je souhaite ajouter des articles au panier pour revoir et confirmer ma sélection avant de passer à l'achat.
- En tant qu'utilisateur, je veux pouvoir voir le total des prix des articles ajoutés dans mon panier, mettre à jour les quantités ou supprimer des articles si nécessaire.

### 4. Page de Paiement (Checkout)
- En tant qu'utilisateur, je souhaite une page de paiement où je peux remplir mes informations pour finaliser mon achat.
- En tant qu'utilisateur, je souhaite que tous les champs requis soient validés pour éviter les erreurs, afin de m'assurer que les informations sont complètes avant de soumettre la commande.

### 5. Navbar Responsive
- En tant qu'utilisateur, je souhaite que la barre de navigation s'adapte aux petits écrans pour naviguer facilement sur mobile.

---

## Pages Bonus

### 6. Page Wishlist
- En tant qu'utilisateur, je souhaite enregistrer mes vêtements favoris dans une liste de souhaits pour les retrouver facilement plus tard.

### 7. Pages de Connexion, Inscription & Profil
- En tant qu'utilisateur, je veux pouvoir m'inscrire et créer un compte pour gérer mes commandes et mon profil.
- En tant qu'utilisateur enregistré, je souhaite me connecter pour accéder à mes informations personnelles et à mon historique d'achats.

---

## Recommandations

1. **Utilisation des unités relatives :** Utilisez des unités de mesure relatives comme les pourcentages et les unités `em` plutôt que des valeurs fixes en pixels pour faciliter l'adaptabilité.

2. **Optimisation du DOM :** Évitez la manipulation directe du DOM lorsque cela n'est pas nécessaire. Privilégiez les modifications par classe, attribut ou contenu, plutôt que de créer des éléments à partir de zéro.

3. **Débogage et inspection :** Utilisez les outils de développement du navigateur pour inspecter et déboguer le DOM et le CSS en temps réel.

4. **Images adaptatives et optimisées :**
   - Utilisez des images adaptatives avec la balise `<img srcset>` pour garantir une qualité optimale.
   - Compressez les images pour réduire la taille des fichiers tout en maintenant une qualité visuelle élevée.

5. **Conformité aux normes d'accessibilité :**
   - Assurez-vous que le site respecte les normes WCAG (Web Content Accessibility Guidelines) pour une expérience inclusive.
   - Utilisez des outils d'audit d'accessibilité tels que **Axe** ou **Lighthouse** pour identifier et corriger les problèmes.

6. **Tests sur divers appareils et résolutions :** Vérifiez que le site s'adapte correctement aux différents appareils et résolutions.

7. **Conformité avec les normes web actuelles :** Assurez-vous que le site est compatible avec les dernières normes web pour une meilleure longévité.

8. **Structure de code modulaire :** Mettez en place une structure de code modulaire et bien documentée pour faciliter la maintenance future.
