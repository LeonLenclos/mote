### Table des matières

- [0- Introduction](#0--introduction)
- [1- Prise en main](#1--prise-en-main)
- [2- Utiliser l'éditeur](#2--utiliser-léditeur)
- [3- Notions avancées](#3--notions-avancées)
- [4- Ressources](#4--ressources)

# 0- Introduction

Ce tutoriel va vous guider pas à pas dans l'utilisation de mote.

## C'est quoi mote ?

mote est un [moteur de jeu](https://fr.wikipedia.org/wiki/Moteur_de_jeu) en [mode texte](http://polyducks.co.uk/what-is-textmode/).

Pour créer un jeu avec mote, on écrit le code du jeu dans un langage spécial que nous allons décrire ici. Ce langage est basé sur [XML](https://developer.mozilla.org/fr/docs/Web/XML/XML_introduction). 

## L'éditeur

L'éditeur se trouve actuellement à cette adresse : [leonlenclos.github.io/mote](https://leonlenclos.github.io/mote)

L'éditeur dispose de trois modes qui sont accessibles en cliquant sur les boutons de la barre du haut :

- **coder** : l'endroit où l'on code son jeu
- **tester** : l'endroit où l'on teste son jeu
- **exporter** : l'endroit où l'on exporte son jeu

# 1- Prise en main

À partir de maintenant, chaque chapitre sera un exemple commenté.

Prenez le temps d'essayer les exemples sur [l'éditeur](https://leonlenclos.github.io/mote) :

1. Dans le tutoriel, Copier le code de l'exemple en appuyant sur le bouton *copier* qui se trouve au-dessus de chaque exemple (<svg aria-hidden="vrai" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="vrai"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>)
1. Dans l'éditeur, Mettez-vous en mode **coder** et collez le code de l'exemple.
2. Mettez-vous en mode **tester** et essayez le jeu.
3. Essayez de faire des modifications dans le code et alternez entre **coder** et **tester**.


### Mon premier jeu

```xml
<jeu>




    @                   ?
------------    -------------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</jeu>
```

Voici un exemple simple d'un jeu créé avec **mote** : Le joueur incarne un `@` et il doit atteindre le `?` sans toucher les `^`. Pour jouer, on utilise les touches fléchées du clavier.

On remarque que le code commence et se termine par des balises : `<jeu>` au début et `</jeu>` à la fin. Le code d'un jeu doit *toujours* être encadré de ces balises. Entre les deux balises, c'est la **définition** du jeu : le jeu est simplement écrit tel qu'il apparaîtra en début de partie.

### Les niveaux

Mon jeu est un peu trop facile, ajoutons de la difficulté.

```xml
<jeu>
<niveau>




    @                   ?
------------    -------------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</niveau>
<niveau>




  @                      ?
--------            ---------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</niveau>
</jeu>
```

Ce jeu comporte deux niveaux. Si l'on arrive à atteindre le `?` on passe au niveau suivant, si on touche un `^` on recommence le niveau dans lequel on est.

Les niveaux sont encadrés par les balises `<niveau>` et `</niveau>`. Le code de notre jeu c'est donc un `<jeu> </jeu>` qui contient plusieurs `<niveau> </niveau>` qui contiennent chacun la définition du niveau.

### Les écrans

C'est un peu étrange de voir le jeu se figer à la fin, et si on affichait plutôt un écran de félicitations.

```xml
<jeu>
<niveau>




    @                   ?
------------    -------------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</niveau>
<niveau>




  @                      ?
--------            ---------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</niveau>
<ecran>




          BRAVO !            



</ecran>
</jeu>
```

La balise `<ecran>` fonctionne comme la balise `<niveau>` la seule différence c'est que son contenu n'est pas jouable. Ici, l'écran est le dernier élément du jeu, mais les écrans peuvent être placé n'importe quand dans le jeu, on peut alors les passer en appuyant sur n'importe quelle touche.

### Un titre

C'est l'heure de donner un titre au jeu et de se débarrasser enfin de ce *untitled*.

```xml
<jeu
titre="le ravin"
>
<niveau>




    @                   ?
------------    -------------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</niveau>
<niveau>




  @                      ?
--------            ---------

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
</niveau>
<ecran>




          BRAVO !            



</ecran>
</jeu>
```

Nous venons de découvrir un nouveau concept de mote, les **règles**.

Nous avons intégré une règle. Le nom de cette règle est `titre`, la valeur de la règle est `"le ravin"`.

On peut indiquer un titre vide avec `titre=""`, dans ce cas, aucun titre ne s'affichera.

Analysons cette nouvelle syntaxe en détail : La règle est renseignée à l'intérieur de la balise ouvrante `<jeu>` plus précisément entre le `<jeu` et le `>`. Entre le nom et la valeur de la règle, il y a un signe `=`. On ne met pas de guillemets autour du nom de la règle, mais on met des guillemets autour de la valeur.

### Les règles de caractères

Marre du `@` du `?` et des `^`, changeons de caractères !

```xml
<jeu
titre="le ravin"
joueur="?"
objectif="X"
mortel="\/|"
>
<niveau>




    ?                   X
------------    -------------

/||\\/|//|\\|||\\//|/\\|//|//
</niveau>
<niveau>




  ?                      X
--------            ---------

/||\\/|//|\\|||\\//|/\\|//|//
</niveau>
<ecran>




          BRAVO !            



</ecran>
</jeu>
```

`titre` n'est pas la seule règle que l'on peut renseigner, il y en a en fait un paquet ! Ici nous nous intéressons aux règles de caractère qui servent à définir quel caractère représente chaque élément du jeu :

- la règle `joueur` pour le ou les caractères qui représentent le joueur.
- la règle `objectif` pour le ou les caractères qui représentent l'objectif.
- la règle `mortel` pour le ou les caractères qui représentent les éléments mortels.

On peut indiquer plusieurs caractères dans la valeur de la règle pour indiquer des variantes. Dans cet exemple, trois caractères peuvent représenter les éléments mortels : `/`, `\` et `|`.


### L'auteur

Mon jeu est prêt, il ne me reste plus qu'à le signer !

```xml
<jeu
titre="le ravin"
auteur="leon"
joueur="?"
objectif="X"
mortel="\/|"
>
<niveau>




    ?                   X
------------    -------------

/||\\/|//|\\|||\\//|/\\|//|//
</niveau>
<niveau>




  ?                      X
--------            ---------

/||\\/|//|\\|||\\//|/\\|//|//
</niveau>
<ecran>




          BRAVO !            



</ecran>
</jeu>
```

Avec la règle `auteur`, j'indique mon nom ou mon pseudo. Ce nom s'affichera à droite du titre.


# 2- Utiliser l'éditeur

## Le mode **coder** en détail

- Parfois des erreurs apparaissent sur fond rouge lorsque l'on veut passer en mode **tester**. C'est qu'il y a un problème dans votre code ! Essayez par exemple d'écrire `<jue>` au lieu de `<jeu>` et de cliquer sur **tester**, vous devriez voir apparaitre une erreur.
- l'option **montrer les invisibles** en bas à gauche permet d'afficher les caractères invisibles par exemple les espaces.
- Le bouton **sauver XML** permet d'enregistrer le code dans un fichier xml. Il est important de sauver régulièrement pour être sûr de ne pas perdre son travail !
- Le bouton **importer XML** permet d'importer le code contenu dans un fichier xml

## Exporter le jeu

En mode **exporter**, cliquer sur le bouton **exporter mon jeu** enregistre un ficher html. Contrairement au fichier xml que l'on peut enregister en mode **coder**, ce fichier ne peut pas être rouverts dans l'éditeur pour le modifier. Par contre, il contient toutes les informations pour exécuter le jeu si on l'ouvre dans un navigateur web ! C'est la meilleure manière de partager son jeu une fois qu'on l'a fini.



# 3- Notions avancées

## Condition de victoire et de défaite.

Il peut y avoir plusieurs joueurs et plusieurs objectifs dans un niveau.

Lorsqu'un joueur touche un objectif, cet objectif disparaît. La partie est gagnée s'il n'y a plus aucun objectif.

Lorsqu'un joueur touche un élément mortel, ce joueur disparaît. La partie est perdue s'il n'y a plus aucun joueur.

### Plusieurs buts ou joueurs

```xml
<jeu>
<niveau>

        ?
       ===    ?
  ?          ===
 ===

         @
</niveau>
<niveau>

@          @
      @
   @      ===   ?
===            ===


^^^^^^^^^^^^^^^^^^^
</niveau>
<ecran>
BRAVO !
</ecran>
</jeu>
```

L'exemple ci-dessus montre ce qu'il se passe quand il y a plusieurs joueurs ou plusieurs buts. Des joueurs peuvent mourir ou des buts être atteint, dans les deux cas, le niveau continue tant qu'il en reste.

### Aucun objectif ou joueur


```xml
<jeu>
<niveau>
   @   
</niveau>
<niveau>
   ?   
</niveau>
</jeu>
```

L'exemple ci-dessus montre ce qu'il se passe s'il n'y a aucun objectif ou aucun joueur.
- quand il n'y a aucun objectif : le niveau est gagné automatiquement avant même que l'on puisse jouer. On passe au niveau suivant.
- quand il n'y a aucun joueur : le niveau est perdu automatiquement avant même que l'on puisse jouer. On recommence le niveau encore et encore.

### Règles de condition de victoire et de défaire

```xml
<jeu
victoire_au_premier_objectif="vrai"
defaite_a_la_premiere_mort="vrai"
>
<niveau>

        ?
       ===    ?
  ?          ===
 ===

         @
</niveau>
<niveau>

 @         @
      @
          ===   ?
===            ===
     ===

^^^^^^^^^^^^^^^^^^^
</niveau>
<ecran>
BRAVO !
</ecran>
</jeu>
```

Les règles `victoire_au_premier_objectif` et `defaite_a_la_premiere_mort` permettent de modifier les conditions de victoire.

Elles peuvent prendre la valeur de `"vrai"` ou `"faux"`.

- `victoire_au_premier_objectif` : si la valeur de cette règle est `"vrai"`, le niveau sera gagné dès que le premier objectif sera atteint.
- `defaite_a_la_premiere_mort` : si la valeur de cette règle est `"vrai"`, le niveau sera perdu dès que le premier joueur mourra.

Par défaut, la valeur de ces règles est `"faux"`


## La taille


### Taille variable

```xml
<jeu
titre=""
>
<niveau>
@ ?
</niveau>
<niveau>



          @   ?               
</niveau>
<ecran>
BRAVO !
</ecran>
</jeu>
```

La taille d'un niveau dépend de sa définition.
- La hauteur d'un niveau est définie par le nombre de ligne dans la définition
- La largeur d'un niveau est définie par le nombre de caractère dans la plus longue ligne de la définition

Lors du calcul de la largeur du niveau, on prend en compte les espaces. Il peut être difficile de travailler avec les espaces, car ils sont par définition invisibles. Pour cette raison il peut être utile de cocher la case *montrer les invisibles*. Cette option permet d'afficher les caractères invisibles et donc notamment de voir les espaces.

### Grandes tailles

```xml
<jeu>
<niveau>
*        .    *                .     '     *              *   '      .          '    *         '        .          *     '          .           *   
   '                   '                            '                         '                   *                           '
@                                                                                                                                                    ?
</niveau>
<niveau>

 @
===
==
=
=
=
==
===
===
===
==
=
=
=
==
===
===
===
==
=
=
=
==
===
===
===
==
=
=
=
==
===
===
===
==
=
=
=
==
===
===
===
==
=
=
=
==
===
===  ?  
</niveau>
<ecran>
BRAVO !
</ecran>
</jeu>
```

Lorsque le niveau est très grand (en largeur, en hauteur ou les deux), le jeu limite la taille de ce qu'il affiche à 80 × 30 caractères. Cela ne veut pas dire que ce qui est au-delà de cette limite est inaccessible. La *caméra* suivra le joueur quand il se déplacera.

### Règles de taille


```xml
<jeu
titre=""
largeur_max="5"
hauteur_max="5"
>
<niveau>
####################
#  #              ?#
#                  #
#@      #          #
####################
</niveau>
<niveau>
#####
#   #
#?  #
##  #
#   #
#   #
#  ##
#   #
##  #
# @ #
#####
</niveau>
<ecran>
BRAVO !
</ecran>
</jeu>

```

Les règles `largeur_max` et `hauteur_max` permettent de définir la taille maximum de l’affichage. La valeur doit être un nombre entier positif.

L'affichage s'adapte à la taille du niveau, mais si la taille du niveau dépasse la taille maximum, on restreint sa taille et on suit le joueur avec la caméra.

- `largeur_max` : définit la largeur maximum de l'affichage. (par défaut : `"80"`)
- `hauteur_max` : définit la hauteur maximum de l'affichage. (par défaut : `"30"`)


## Des règles spécifiques aux niveaux

Pour l'instant nous avons attaché toutes les règles au jeu entier en les écrivant entre `<jeu` et `>`. Il est aussi possible d'attacher des règles aux niveaux ou aux écrans en les écrivant entre `<niveau` et `>` ou entre `<ecran` et `>`

```xml
<jeu
titre="Le titre du jeu"
>
<niveau>
@                 ?
</niveau>
<niveau
titre="uej ud ertit eL"
>
?                 @
</niveau>
<niveau>
@                 ?
</niveau>
<ecran>
       bravo       
</ecran>
</jeu>
```

Dans cet exemple la règle `titre` est définie deux fois, une fois pour le jeu dans son ensemble et une fois pour le niveau 2.

Pour connaitre la valeur d'une règle, le moteur de jeu cherche d'abord si elle est définie dans le niveau, si ce n'est pas le cas on regarde si elle est définie dans le jeu, sinon on prend sa valeur par défaut.

Toutes les règles peuvent être définies localement (dans un `<niveau>`), globalement (dans `<jeu>`), ou ne pas être définie du tout (valeur par défaut).

## Les caractères plus en détail

On a déjà vu plus tôt les règles `joueur`, `objectif` et `mortel`. Il existe deux autres type de caractère, `solide` et `air`, qui disposent eux aussi d'une règle. Enfin, il existe deux règles (`caractere_par_defaut` et `type_par_defaut`) qui ne définissent pas un type de caractère mais qui influencent la manière dont les caractères sont pris en charge par le jeu.


- `joueur` : (valeur par défaut : `"@"`) définit le ou les caractères qui représentent le joueur.
- `objectif` :  (valeur par défaut : `"?"`) définit le ou les caractères qui représentent l'objectif.
- `mortel` :  (valeur par défaut : `"^"`) définit le ou les caractères qui représentent les éléments mortels.
- `solide` :  (valeur par défaut : `""`) définit le ou les caractères qui représentent les éléments solides.
- `air` : (valeur par défaut : `" "`) définit le ou les caractères qui représentent l'air.
- `caractere_par_defaut` :  (valeur par défaut : `" "`) définit le caractère à placer aux endroits ou il n'y a pas de caractère.
- `type_par_defaut` :  (valeur par défaut : `"solide"`) définit le type d'élément à attribuer à un caractère qui n'est définit dans aucune règle.


### choisir des caractères spéciaux pour l'air et les éléments solides

```xml
<jeu
air=":"
solide=" "
>
::::?::::::::
::::::::::?::
:::::::::::::
?::::  ::::::
:::::  ::::::
:@:::  ::::?:
</jeu>
```


Ici l'air est représenté par des `:` et les éléments solides sont des espaces !

Notez que derrière le joueur et les buts, le jeu place automatiquement un caractère d'air.

### choisir un different type par défaut

```xml
<jeu>
<niveau
type_par_defaut="objectif"
titre="tout est objectif"
>

  par exemple ?  

      @
</niveau>
<niveau
type_par_defaut="joueur"
titre="tout est le joueur"
>

  par exemple ?  

      @
</niveau>
<niveau
type_par_defaut="mortel"
titre="tout est mortel"
>

  par exemple ?  

      @
</niveau>
<niveau
type_par_defaut="air"
titre="tout est de l'air"
>

  par exemple ?  

      @
</niveau>
<ecran
titre=""
>
bravo !
</ecran>
</jeu>
```

En temps normal, un caractère qui n'est défini dans aucune règle est considéré comme un élément `solide`. Ici, on indique que les caractères qui ne sont pas défini doivent être considérés comme un `objectif`, un `joueur`, un élément `mortel`, ou de l'`air`.

### choisir un différent caractère par défaut

Lorsque le jeu lance un niveau, il remplie toutes les cases vides avec des éspaces. Grace à la règle `caractere_par_defaut`, on peut définir un autre caractère de remplissage.

```xml
<jeu
air=":"
solide=" "
caractere_par_defaut=":"
>
::::?
::::::::::?

?::::  
:::::  
:@:::  ::::?
</jeu>
```

Cet exemple est le même qu'un peu plus haut, mais je n'ai pas eu besoin d'écrire les `:` en fin de ligne et sur les lignes vides.

## Le style

Les options `couleur_ap`, `couleur_ap2`, `couleur_pp` et `couleur_pp2` permettent de changer les couleurs du jeu.

```xml
<jeu>
<ecran
couleur_ap="#fff8e7"
couleur_ap2="#ffffd6"
couleur_pp="#3c45a2"
couleur_pp2="#383253"
>


    Par exemple...    

                   -->
</ecran>
<ecran
couleur_ap="#eeffaa"
couleur_ap2="#ff3355"
couleur_pp="#55aa00"
couleur_pp2="#aa0055"
>


    Par exemple...    

                   -->
</ecran>
<ecran
couleur_ap="#ffff00"
couleur_ap2="#ffff00"
couleur_pp="#0000ff"
couleur_pp2="#0000ff"
>


    Par exemple...    


</ecran>
</jeu>
```

- `couleur_ap` : permet de choisir la couleur de l'arrière plan de la fenêtre.
- `couleur_ap2` : permet de choisir la couleur de l'arrière plan du jeu.
- `couleur_pp` : permet de choisir la couleur du texte.
- `couleur_pp2` : permet de choisir la couleur des contours.

La valeur doit être le code Hexadécimal d'une couleur.

## Caractères spéciaux

Deux caractères sont interdits dans la description du jeu : `<` et `&`

Trois caractères sont interdits dans les valeurs des règles : `"`, `<` et `&`

Si vous transgressez une de ces interdictions, vous aurez une erreur. Il existe néanmoins des moyens de contourner ces interdictions.

### Contourner les interdictions dans la description du jeu

Pour contourner l'interdiction dans la description du jeu il faut placer la description dans une section CDATA. Une section CDATA commence par `<![CDATA[` et se termine par `]]>`

```xml
<jeu>
<niveau><![CDATA[


   @        ?
  <<<<<<>>>>>>  

]]></niveau>
<ecran>
  Bravo! 
</ecran>
</jeu>
```
Sans la section CDATA, ce code n'aurait pas fonctionné à cause du caractère interdit `<`


### Contourner les interdictions dans les valeurs des règles

Pour contourner l'interdiction dans la valeur d'une règle il faut utiliser les versions échappées des caractères.

- `"` s'échappe en écrivant `&quot;`
- `<` s'échappe en écrivant `&lt;`
- `&` s'échappe en écrivant `&amp;`


```xml
<jeu
joueur="&lt;"
>
<niveau><![CDATA[

 
 ?          <  
]]></niveau>
<ecran>
  Bravo! 
</ecran>
</jeu>
```

Pour que le joueur soit représenté par `<`, je dois échapper le caractère dans la règle (en remplaçant `<` par `&lt;`) et je n'oublie pas de bien mettre ma description dans une section CDATA.

## La physique

Il est possible de modifier la physique du jeu nous allons voir des règles qui définissent la gravité, la force du joueur, et la gestion des sauts.


- `gravite` : (valeur par défaut : 0.6) la gravité du monde dans lequel le joueur évolue. Avec une gravité de `0`, le joueur ne retombera pas après avoir sauté. Si la gravité est plus grande que la `force_du_saut` du joueur, le joueur ne pourra pas sauter.
- `force_du_saut` : (valeur par défaut : 1) la force de saut du joueur. Plus elle est grande, plus le joueur saute haut. Encore une fois, cette valeur doit être supérieur à la valeur de `gravite` pour que le joueur puisse sauter.
- `force_du_deplacement` : (valeur par défaut : 1) la force de déplacement du joueur. Plus elle est basse, plus le joueur mettra du temps à atteindre sa vitesse maximale. Avec une valeur de 1, la vitesse maximale est directement atteinte. (n.b. La vitesse maximale ne peut pas être modifiée)
- `freinage` : (valeur par défaut : 1) Avec une valeur de 1, le joueur arrête de se déplacer dès que l'on relâche la touche de déplacement. Avec une valeur de 0, le joueur ne s'arrête pas, comme s'il était sur de la glace. Différentes valeurs entre 0 et 1 donnent la sensation de sols plus ou moins glissant.
- `temps_du_saut` : (valeur par défaut : 0.2) pendant combien de temps (en seconde) la force du saut s'exerce si on reste appuyé sur la touche du saut. Cela permet que l'on puisse sauter plus ou moins haut selon que l'on appuie plus ou moins longtemps sur la touche du saut.
- `temps_coyote` : (valeur par défaut : 0.2) pendant combien de temps (en seconde) le joueur peut encore sauter après avoir dépassé le seuil d'une plateforme. Cela permet de donner la sensation à l'utilisateur de ne pas avoir raté un saut de manière injuste quand il se déplace sur des petites plateformes.
- `temps_du_saut_tampon` : (valeur par défaut : 0.2) combien de temps avant d'attérir (en seconde) on peut commencer à appuyer sur la touche saut pour sauter à nouveau. Cela permet d'enchaîner les sauts rapidement sans avoir besoin d'être précis comme un robot.

```xml
<jeu
gravite="0.6"
force_du_saut="1"
force_du_deplacement="1"
freinage="1"
temps_coyote="0.2"
temps_du_saut_tampon="0.2"
temps_du_saut="0.2"
>





                     @


                =========================================

                                                                     
          ========                                                                        

                 ====================
                                                                                                      ?
==================                                         =============================================


</jeu>
```

Cet exemple contient toutes les valeurs par défaut des différentes règles de physique. Utilisez cet exemple en modifiant les règles si vous voulez expérimenter différentes valeurs.


## Les commentaires

Pour s'y retrouver dans un gros projet il est possible de laisser des commentaires. Un commentaire commence par `<!--` et se termine par `-->`. Ce qu'il contient est ignoré par le moteur de jeu.

```xml
<!-- Ceci est un commentaire -->
<jeu>
<!--
Ceci est un commentaire
Sur plusieurs lignes
-->
<niveau>
@        ?
</niveau>
<!-- Encore un commentaire -->
<ecran>
Bravo !
</ecran>
</jeu>
```

# 4- Ressources

- Pour choisir une couleur et connaître son code hexadécimal (`Hex Code`) : [colorpicker.me](https://colorpicker.me)
- Pas la peine de se limiter aux caractères disponibles sur le clavier, La plupart des caractères listés sur cette page devraient pouvoir être utilisé dans un jeu mote : [wikipedia:List of Unicode characters](https://en.wikipedia.org/wiki/List_of_Unicode_characters)
- Un outil pour dessiner avec du texte. Le texte peut ensuite aisément être copié dans l'éditeur mote : [asciiflow.com](https://asciiflow.com)