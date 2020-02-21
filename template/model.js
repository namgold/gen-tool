module.exports = app => {{
    const schema = app.db.Schema({schemaMongo});
    const model = app.db.model("{lowerCamel}", schema);

    app.model.{lowerCamel} = {{
        create: (data, done) => {{
            model.findOne({{ {key}: data.{key} }}, (error, item) => {{
                if (error) {{
                    done && done(error);
                }} else if (!item) {{
                    model.create(data, done);
                }} else {{
                    done && done({{ exist: true, message: "{name} " + data.{key} + " đã tồn tại" }});
                }}
            }});
        }},

        getPage: (pageNumber, pageSize, condition, done) => model.countDocuments(condition, (error, totalItem) => {{
            if (error) {{
                done(error);
            }} else {{
                let result = {{ totalItem, pageSize, pageTotal: Math.ceil(totalItem / pageSize) }};
                result.pageNumber = pageNumber === -1 ? result.pageTotal : Math.min(pageNumber, result.pageTotal);
                const skipNumber = (result.pageNumber > 0 ? result.pageNumber - 1 : 0) * result.pageSize;
                model.find(condition).sort({{ _id: 1 }}).skip(skipNumber).limit(result.pageSize).exec((error, items) => {{
                    done(error, app.clone(result, {{ list: items }}));
                }});
            }}
        }}),

        getAll: (condition, done) => done ?
                model.find(condition).exec(done) :
                model.find({{}}).exec(condition),

        get: (condition, done) => typeof condition == "object" ?
                model.findOne(condition, done) :
                model.findById(condition, done), // condition is _id

        update: (_id, changes, done) => {{
            if (changes.{key}) {{
                model.findOne({{ {key}: changes.{key} }}, (error, item) => {{
                    if (error) {{
                        done && done(error);
                    }} else if (!item || item._id == _id) {{
                        model.findOneAndUpdate({{ _id }}, {{ $set: changes }}, {{ new: true }}, done)
                    }} else {{
                        done && done("{key} is duplicated");
                    }}
                }});
            }} else {{
                model.findOneAndUpdate({{ _id }}, {{ $set: changes }}, {{ new: true }}, done)
            }}
        }},

        delete: (_id, done) => model.findById(_id, (error, item) => {{
            if (error) {{
                done(error);
            }} else if (item == null) {{
                done("Invalid Id!");
            }} else {{
                item.remove(done);
            }}
        }}),

        deleteMany: (condition, done) => model.deleteMany(condition, done),
    }};
}};
