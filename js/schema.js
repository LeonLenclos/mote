let moteSchema = {};

moteSchema.tags = {
    game:{
        localization:{
            'en':'game',
            'fr':'jeu',
        },
        doc:{
            'en':"Defines a game. The game can either be defined by the text it contains, or by a sequence of scenes (levels or screens).",
            'fr':"Définit un jeu. Le jeu peut être défini soit par le texte qu'il contient, soit par une succession de scènes (niveaux ou écrans).",
        },
    },
    level:{
        localization:{
            'en':'level',
            'fr':'niveau',
        },
        doc:{
            'en':"Defines a level. The level is defined by the text it contains. A level is a scene that you can play, if you lose you start again, if you win you go to the next scene.",
            'fr':"Définit un niveau. Le niveau est défini par le texte qu'il contient. Un niveau est une scène que l'on peut jouer, si on perd on recommence, si on gagne on passe à la scène suivante.",
        },
    },
    screen:{
        localization:{
            'en':'screen',
            'fr':'ecran',
        },
        doc:{
            'en':"Defines a screen. The screen is defined by the text it contains. A screen is a scene that is not playable and that can be skipped by pressing a key.",
            'fr':"Définit un écran. L'écran est défini par le texte qu'il contient. Un écran est une scène qui n'est pas jouable et qui peut être sautée en appuyant sur une touche.",
        },
    },
};

moteSchema.keywords = {
    controls:[
        {
            value:'platformer',
            localization:{
                en:'platformer',
                fr:'plateformes'
            }
        },
        {
            value:'adventure',
            localization:{
                en:'adventure',
                fr:'aventure'
            }
        },
    ],
    boolean:[
        {
            value:true,
            localization:{
                en:'true',
                fr:'vrai'
            }
        },
        {
            value:false,
            localization:{
                en:'false',
                fr:'faux'
            }
        },
    ],
    type:[
        {
            value:'solid',
            localization:{
                en:'solid',
                fr:'solide'
            }
        },
        {
            value:'air',
            localization:{
                en:'air',
                fr:'air'
            }
        },
        {
            value:'deadly',
            localization:{
                en:'deadly',
                fr:'mortel'
            }
        },
        {
            value:'player',
            localization:{
                en:'player',
                fr:'joueur'
            }
        },
        {
            value:'goal',
            localization:{
                en:'goal',
                fr:'objectif'
            }
        },
    ],
};

moteSchema.validations = {
    zeroOrMoreChar:{
        process:(value)=>value,
        test:(value)=>true,
        description:{
            en:"Must contain zero or more characters.",
            fr:"Doit contenir zéro caractères ou plus.",
        }
    },
    oneOrMoreChar:{
        process:(value)=>value,
        test:(value)=>value.length > 0,
        description:{
            en:"Must contain one or more characters.",
            fr:"Doit contenir un caractères ou plus.",
        }
    },
    controlsKeyword:{
        process:(value)=>moteSchema.keywords.controls.find(kw=>Object.values(kw.localization).includes(value)).value,
        test:(value)=>moteSchema.keywords.controls.some(kw=>Object.values(kw.localization).includes(value)),
        description:{
            en:"Must have one of these values : " + moteSchema.keywords.controls.map(kw=> kw.localization.en).join(', '),
            fr:"Doit avoir une de ces valeurs : " + moteSchema.keywords.controls.map(kw=> kw.localization.fr).join(', '),
        }
    },
    typeKeyword:{
        process:(value)=>moteSchema.keywords.type.find(kw=>Object.values(kw.localization).includes(value)).value,
        test:(value)=>moteSchema.keywords.type.some(kw=>Object.values(kw.localization).includes(value)),
        description:{
            en:"Must have one of these values : " + moteSchema.keywords.type.map(kw=> kw.localization.en).join(', '),
            fr:"Doit avoir une de ces valeurs : " + moteSchema.keywords.type.map(kw=> kw.localization.fr).join(', '),
        }
    },
    booleanKeyword:{
        process:(value)=>moteSchema.keywords.boolean.find(kw=>Object.values(kw.localization).includes(value)).value,
        test:(value)=>moteSchema.keywords.boolean.some(kw=>Object.values(kw.localization).includes(value)),
        description:{
            en:"Must have one of these values : " + moteSchema.keywords.boolean.map(kw=> kw.localization.en).join(', '),
            fr:"Doit avoir une de ces valeurs : " + moteSchema.keywords.boolean.map(kw=> kw.localization.fr).join(', '),
        }
    },
    positiveInt:{
        process:(value)=>parseFloat(value),
        test:(value)=>Number.isInteger(parseFloat(value)) && parseFloat(value) > 0,
        description:{
            en:"Must be a positive integer.",
            fr:"Doit être un nombre entier positif.",
        }
    },
    float:{
        process:(value)=>parseFloat(value),
        test:(value)=>!isNaN(parseFloat(value)),
        description:{
            en:"Must be a number.",
            fr:"Doit être un nombre.",
        }
    },
    string:{
        process:(value)=>value,
        test:(value)=>true,
        description:{
            en:"Must be text.",
            fr:"Doit être du texte.",
        }
    },
    color:{
        process:(value)=>value,
        test:(value)=>value.match(/^#[0-9A-F]{6}$/i),
        description:{
            en:"Must be a hexadecimal color code.",
            fr:"Doit être un code couleur hexadécimal.",
        }
    },
};

moteSchema.rules = {
    air:{
        default: " ",
        validation: moteSchema.validations.zeroOrMoreChar,
        localization:{
            en:"air",
            fr:"air",
        },
        doc:{
            en:"Character that represents the air.",
            fr:"Caractère qui représentent l'air.",
        }
    },
    author:{
        default: "",
        validation: moteSchema.validations.string,
        localization:{
            en:"author",
            fr:"auteur",
        },
        doc:{
            en:"Name of the person who created the game.",
            fr:"Nom de la personne qui a créé le jeu.",
        }
    },
    controls:{
        default: "platformer",
        keywords:'controls',
        validation: moteSchema.validations.controlsKeyword,
        localization:{
            en:"controls",
            fr:"controles",
        },
        doc:{
            en:"[experimental]",
            fr:"[experimental]",
        }
    },
    default_char:{
        default: " ",
        validation: moteSchema.validations.oneOrMoreChar,
        localization:{
            en:"default_char",
            fr:"caractere_par_defaut",
        },
        doc:{
            en:"Character to be placed where there is none.",
            fr:"Caractère à placer là où il n'y en a pas.",
        }
    },
    default_type:{
        default: "solid",
        keywords: "type",
        validation: moteSchema.validations.typeKeyword,
        localization:{
            en:"default_type",
            fr:"type_par_defaut",
        },
        doc:{
            en:"Type to assign to characters that are not defined in any rule.",
            fr:"Type à attribuer aux caractères qui ne sont définis dans aucune règle.",
        }
    },
    goal:{
        default: "?",
        validation: moteSchema.validations.zeroOrMoreChar,
        localization:{
            en:"goal",
            fr:"objectif",
        },
        doc:{
            en:"Character that represents the goals.",
            fr:"Caractère qui représentent les objectifs.",
        }
    },
    deadly:{
        default: "^",
        validation: moteSchema.validations.zeroOrMoreChar,
        localization:{
            en:"deadly",
            fr:"mortel",
        },
        doc:{
            en:"Character that represents the deadly elements.",
            fr:"Caractère qui représentent les éléments mortels.",
        }
    },
    max_height:{
        default: "30",
        validation: moteSchema.validations.positiveInt,
        localization:{
            en:"max_height",
            fr:"hauteur_max",
        },
        doc:{
            en:"The maximum height of the window.",
            fr:"La hauteur maximum de la fenêtre.",
        }
    },
    max_width:{
        default: "80",
        validation: moteSchema.validations.positiveInt,
        localization:{
            en:"max_width",
            fr:"largeur_max",
        },
        doc:{
            en:"The maximum width of the window.",
            fr:"La hauteur largeur de la fenêtre.",
        }
    },
    player:{
        default: "@",
        validation: moteSchema.validations.zeroOrMoreChar,
        localization:{
            en:"player",
            fr:"joueur",
        },
        doc:{
            en:"Character that represents the player.",
            fr:"Caractère qui représentent le joueur.",
        }
    },
    solid:{
        default: "",
        validation: moteSchema.validations.zeroOrMoreChar,
        localization:{
            en:"solid",
            fr:"solide",
        },
        doc:{
            en:"Character that represents the solid elements.",
            fr:"Caractère qui représentent les éléments solides.",
        }
    },
    title:{
        default: "untitled",
        validation: moteSchema.validations.string,
        localization:{
            en:"title",
            fr:"titre",
        },
        doc:{
            en:"Game title.",
            fr:"Titre du jeu.",
        }
    },
    win_on_first_goal:{
        default: "false",
        keywords:'boolean',
        validation: moteSchema.validations.booleanKeyword,
        localization:{
            en:"win_on_first_goal",
            fr:"victoire_au_premier_objectif",
        },
        doc:{
            en:"Win the level as soon as a goal is reached (without the necessity to reach all of them).",
            fr:"Gagner le niveau dès qu'un objectif est atteint (sans avoir besoin de tous les atteindre).",
        }
    },
    lose_on_first_death:{
        default: "false",
        keywords:'boolean',
        validation: moteSchema.validations.booleanKeyword,
        localization:{
            en:"lose_on_first_death",
            fr:"defaite_a_la_premiere_mort",
        },
        doc:{
            en:"Lose the level as soon as a player is dead (without waiting for them all to die).",
            fr:"Perdre le niveau dès qu'un joueur est mort (sans attendre qu'ils soient tous morts).",
        }
    },
    braking:{
        default: 1,
        validation: moteSchema.validations.float,
        localization:{
            en:"braking",
            fr:"freinage",
        },
        doc:{
            en:"Braking force. Different values between 0 and 1 give the feeling of a more or less slippery floor.",
            fr:"Force de freinage. Différentes valeurs entre 0 et 1 donnent la sensation d'un sol plus ou moins glissant.",
        }
    },
    gravity:{
        default: 0.6,
        validation: moteSchema.validations.float,
        localization:{
            en:"gravity",
            fr:"gravite",
        },
        doc:{
            en:"Gravity force. With a gravity of 0, the player will not fall back after jumping. If the gravity is greater than the jump force, the player will not be able to jump.",
            fr:"Force de gravité. Avec une gravité de 0, le joueur ne retombera pas après avoir sauté. Si la gravité est plus grande que la force de saut, le joueur ne pourra pas sauter.",
        }
    },
    jump_force:{
        default: 1,
        validation: moteSchema.validations.float,
        localization:{
            en:"jump_force",
            fr:"force_du_saut",
        },
        doc:{
            en:"Jump force. The higher the value, the higher the player jumps.",
            fr:"Force de saut. Plus la valeur est grande, plus le joueur saute haut.",
        }
    },
    move_force:{
        default: 1,
        validation: moteSchema.validations.float,
        localization:{
            en:"move_force",
            fr:"force_du_deplacement",
        },
        doc:{
            en:"Move force. The lower the value, the longer it takes the player to reach the maximum speed. With a value of 1, the maximum speed is reached immediately.",
            fr:"Force de déplacement. Plus elle est basse, plus le joueur met du temps à atteindre sa vitesse maximale. Avec une valeur de 1, la vitesse maximale est immédiatement atteinte.",
        }
    },
    jump_time:{
        default: 0.2,
        validation: moteSchema.validations.float,
        localization:{
            en:"jump_time",
            fr:"temps_du_saut",
        },
        doc:{
            en:"Jump time (in seconds). How long the jump force is applied if the jump key is held down. This makes it possible to jump higher or lower depending on how long the jump key is pressed.",
            fr:"Temps du saut (en secondes). Pendant combien de temps la force du saut s’exerce si on reste appuyé sur la touche du saut. Cela permet que l’on puisse sauter plus ou moins haut selon que l’on appuie plus ou moins longtemps sur la touche du saut.",
        }
    },
    coyote_time:{
        default: 0.2,
        validation: moteSchema.validations.float,
        localization:{
            en:"coyote_time",
            fr:"temps_coyote",
        },
        doc:{
            en:"Coyote time (in seconds). How long the player can still jump after passing the threshold of a platform.",
            fr:"Temps coyote (en secondes). Pendant combien de temps le joueur peut encore sauter après avoir dépassé le seuil d’une plateforme.",
        }
    },
    jump_buffer_time:{
        default: 0.2,
        validation: moteSchema.validations.float,
        localization:{
            en:"jump_buffer_time",
            fr:"temps_du_saut_tampon",
        },
        doc:{
            en:"Buffer jump time (in seconds). How long before you land you can start pressing the jump key to jump again.",
            fr:"Temps du saut tampon (en secondes). Combien de temps avant d’atterrir on peut commencer à appuyer sur la touche saut pour sauter à nouveau.",
        }
    },
    fg_color:{
        default:"#e0e0e0",
        validation: moteSchema.validations.color,
        localization:{
            en:"fg_color",
            fr:"couleur_pp",
        },
        doc:{
            en:"Foreground color.",
            fr:"Couleur du premier plan.",
        }
    },
    fg2_color:{
        default:"#808080",
        validation: moteSchema.validations.color,
        localization:{
            en:"fg2_color",
            fr:"couleur_pp2",
        },
        doc:{
            en:"Secondary foreground color.",
            fr:"Couleur secondaire du premier plan.",
        }
    },
    bg_color:{
        default:"#202020",
        validation: moteSchema.validations.color,
        localization:{
            en:"bg_color",
            fr:"couleur_ap",
        },
        doc:{
            en:"Background color.",
            fr:"Couleur de l'arrière-plan",
        }
    },
    bg2_color:{
        default:"#000000",
        validation: moteSchema.validations.color,
        localization:{
            en:"bg2_color",
            fr:"couleur_ap2",
        },
        doc:{
            en:"Secondary background color.",
            fr:"Couleur secondaire de l'arrière-plan",
        }
    },
};
