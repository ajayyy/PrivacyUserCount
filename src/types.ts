interface Config {
    port: number,
    mode: Mode,
    defaultUserCount: number
}

enum Mode {
    production = "production",
    development = "development"
}

export {
    Config,
    Mode
}