create table articles
(
    id           INTEGER
        primary key autoincrement,
    title        TEXT,
    author       TEXT,
    source_id    INTEGER,
    source_name  TEXT,
    published_at TEXT,
    url          TEXT,
    time_stamp   TEXT    not null,
    query        TEXT    not null,
    from_date    TEXT    not null,
    to_date      TEXT    not null
);

drop table articles;