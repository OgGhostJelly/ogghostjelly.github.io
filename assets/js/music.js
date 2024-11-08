class MusicItem {
    constructor(src, name, author, href) {
        this.name = name;
        this.author = author;
        this.src = "assets/music/" + src;
        this.href = href;
    }
}

const music = [
    new MusicItem("mommy.mp3", "Mommy", "R.I.P feat. Nick Stratton", "https://open.spotify.com/track/1CVgnRV4SnWEHaX4qZZY38"),
    new MusicItem("its raining somewhere else.mp3", "It's Raining Somewhere Else", "Toby Fox", "https://open.spotify.com/track/5z4vmar50qPl80GjIrPBXm"),
    new MusicItem("classic j dies and goes to hell.mp3", "classic j dies and goes to hell", "glass beach", "https://open.spotify.com/track/3ezuOjWuTirncJITAb8ahf"),
    new MusicItem("i thought we were lovers.mp3", "i thought we were lovers", "in love with a ghost", "https://open.spotify.com/track/23VciRIsKDL6JjfhQzTKiY"),
    new MusicItem("james brown.mp3", "James Brown", "Cage the Elephant", "https://open.spotify.com/track/7wqGNKgDuDsOSLbWQgrqqK"),
    new MusicItem("bready steady go.mp3", "BREADY STEADY GO", "OMORI", "https://open.spotify.com/track/021bvbV0fD3JtZPFHwxJk3"),
    new MusicItem("leopard.mp3", "Leopard", "Jack Stauber", "https://open.spotify.com/track/4TfCsnA1oYDI91st4X594i"),
    new MusicItem("worst case scenario.mp3", "Worst Case Scenario", "The Hoosiers", "https://open.spotify.com/track/3JRiuXnRjZyK8S6WHNdEJk"),
]

function randsong() {
    return music[Math.floor(Math.random() * music.length)]
}