SET QUOTED_IDENTIFIER OFF   --needed so that we can use " as String delimitier!
INSERT INTO movie (
    title,
    fsk, 
    length, 
    release_date, 
    description, 
    trailer_url, 
    picture_path
) 
VALUES 
    (   
        "Tenet",
        12,
        150,
        '2020-08-26',
        "Ein Agent wird rekrutiert, um einen besonderen Auftrag auszuführen: Er soll den 3. Weltkrieg verhindern. Diesmal ist jedoch keine nukleare Bedrohung der Grund, sondern es muss eine Person gestoppt werden, welche die Fähigkeit besitzt, die Zeit zu manipulieren.",
        "https://youtu.be/5Oxbl3yAzUc",
        "pics/poster/tenet.jpg"
    ),
    (   
        "Spiderman - Far From Home",
        12,
        130,
        '2019-04-07',
        "Nach der epischen Schlacht gegen Thanos und den schicksalshaften Ereignissen um die Avengers ist Peter zurück an seiner alten Schule. Um vom Superheldendasein etwas auszuruhen, kommt ihm eine Klassenfahrt nach Europa gerade recht, auch um seiner heimlichen Liebe 'MJ' endlich seine Gefühle gestehen zu können.",
        "https://youtu.be/5dZVluJh8QI",
        "pics/poster/spiderman.jpg"
    ),
    (   
        "1917",
        12,
        119,
        '2020-01-16',
        "Auf dem Höhepunkt des Ersten Weltkriegs wird Schofield und Blake, zwei jungen britischen Soldaten, eine scheinbar unmögliche Mission gegeben: In einem Wettlauf gegen die Zeit sollen sie das Feindesgebiet durchqueren und eine höchst dringliche Nachricht überbringen, die hunderte Männer retten kann – darunter Blakes eigenen Bruder.",
        "https://youtu.be/q7P30Idq1-8",
        "pics/poster/1917.jpg"
    ),
    (   
        "A Toy Story",
        0,
        100,
        '2019-08-15',
        "Die Cowboy-Puppe Woody und sein Freund Buzz Lightyear haben sich mit den anderen Spielsachen gut im Kinderzimmer ihrer neuen Besitzerin, Bonnie, eingerichtet. Als das Mädchen aus einem Göffel (Gabel + Löffel) ein neues Spielzeug namens Forky bastelt und es ins Herz schließt, nehmen sie den ungewöhnlichen Zuwachs mit offenen Armen in ihre Mitte auf.",
        "https://youtu.be/2j8nuYqA_4g",
        "pics/poster/a_toy_story.jpg"
    ),
    (   
        "Aladdin",
        6,
        129,
        '2019-05-23',
        "Der Straßendieb Aladdin macht am liebsten mit seinem Affen Abu die Straßen von Agrabah unsicher. Auf den Basaren der Stadt ist kein noch so wertvoll aussehender Gegenstand vor ihm sicher. Doch er möchte dieses Leben als kleiner Gauner gerne hinter sich lassen, da er der festen Überzeugung ist, zu etwas Größerem bestimmt zu sein.",
        "https://youtu.be/mQ8vWGe5K1M",
        "pics/poster/aladding.jpg"
    ),
    (   
        "Avengers - End Game",
        12,
        181,
        '2019-04-24',
        "Thanos hat also tatsächlich Wort gehalten, seinen Plan in die Tat umgesetzt und die Hälfte allen Lebens im Universum ausgelöscht. Die Avengers? Machtlos. Iron Man und Nebula sitzen auf dem Planeten Titan fest, während auf der Erde absolutes Chaos herrscht.Doch dann finden Captain America und die anderen überlebenden Helden auf der Erde heraus, dass Nick Fury...",
        "https://youtu.be/L0d-hlXss_U",
        "pics/poster/avengers.jpg"
    ),

    (   
        "Nobody",
        16,
        92,
        '2021-05-13',
        "Hutch Mansell, ein Vorstadtvater, übersehener Ehemann, unscheinbarer Nachbar - ein 'Niemand'. Als eines Nachts zwei Diebe in sein Haus einbrechen, entzündet sich Hutchs unbekannte, lange schwelende Wut und treibt ihn auf einen brutalen Weg, der dunkle Geheimnisse aufdeckt, die er zurückgelassen hat.",
        "https://youtu.be/l7sBoMS6O60",
        "pics/poster/nobody.jpg"
    ),

    (   
        "Bad Boys for Life",
        16,
        124,
        '2020-01-16',
        "Draufgänger Mike Lowrey und sein Partner Marcus Burnett stehen immer noch im Dienst der Polizei und treiben Captain Howard nach wie vor mit Missionen zur Weißglut, die in Destruktionsorgien enden. Während Einzelgänger Mike immer noch mit seinem Job verheiratet ist, wird Familienmensch Marcus zunehmend klar...",
        "https://youtu.be/KNuvdaWA-e0",
        "pics/poster/bad_boys.jpg"
    ),

    (   
        "Bloodshot",
        16,
        110,
        '2020-03-05',
        "Nachdem er und seine Frau ermordet wurden, wird Ray Garrison von einem Team aus Wissenschaftlern wiedererweckt. Mit Nanotechnologie ausgestattet wird er zu einer übermenschlichen Tötungsmaschine – Bloodshot. Während er mit anderen Supersoldaten trainiert...",
        "https://youtu.be/zc9v8Jh6llE",
        "pics/poster/bloodshot.jpg"
    ),

    (   
        "Knives Out",
        12,
        131,
        '2020-01-02',
        "Harlan Thrombey ist tot! Und nicht nur das – der renommierte Krimiautor und Familienpatriarch wurde auf der Feier zu seinem 85. Geburtstag umgebracht. Doch natürlich wollen weder die versammelte exzentrische Verwandtschaft noch das treu ergebene Hauspersonal etwas gesehen haben. Ein Fall für Benoit Blanc!",
        "https://youtu.be/qLqIvdw7UmI",
        "pics/poster/knives_out.jpg"
    )