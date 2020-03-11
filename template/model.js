module.exports = app => {{
    const schema = app.db.Schema({schemaMongo});
    const model = app.db.model("{lowerCamel}", schema);

    app.model.{lowerCamel} = {{
        create: (data, done) => {{
            if (done)
                model.findOne({{ {key}: data.{key} }}, (error, item) => {{
                    if (error) done(error);
                    else if (!item) model.create(data, done);
                    else done({{ exist: true, message: "{name} " + data.{key} + " đã tồn tại" }});
                }});
            else return new Promise((resolve, reject) =>
                model.findOne({{ {key}: data.{key} }}).then(item => {{
                    if (item) reject({{ exist: true, message: "{name} " + data.{key} + " đã tồn tại" }});
                    else model.create(data).then(item => resolve(item)).catch(error => reject(error));
                }})//.catch(error => reject(error))
            )
        }},

        createOrUpdate: (data, done) => {{
            if (done)
                model.findOne({{ {key}: data.{key} }}, (error, item) => {{
                    if (error) done(error);
                    else if (!item) model.create(data, done);
                    else app.model.{lowerCamel}.update(data._id, data, done);
                }});
            else return new Promise((resolve, reject) =>
                model.findOne({{ {key}: data.{key} }}).then(item => {{
                    if (item) app.model.{lowerCamel}.update(data, (error, data) => !(error && reject(error) + ' ') && resolve(data));
                    else model.create(data).then(item => resolve(item)).catch(error => reject(error));
                }})
            )
        }},

        getPage: (pageNumber, pageSize, condition, done) => model.countDocuments(condition, (error, totalItem) => {{
            if (error)
                done(error);
            else {{
                let result = {{ totalItem, pageSize, pageTotal: Math.ceil(totalItem / pageSize) }};
                result.pageNumber = pageNumber === -1 ? result.pageTotal : Math.min(pageNumber, result.pageTotal);
                const skipNumber = (result.pageNumber > 0 ? result.pageNumber - 1 : 0) * result.pageSize;
                model.find(condition).sort({{ _id: 1 }}).skip(skipNumber).limit(result.pageSize).exec((error, items) => done(error, app.clone(result, {{ list: items }})));
            }}
        }}),

        getAll: (condition, done) => done ?
                model.find(condition).exec(done) :
                model.find({{}}).exec(condition),

        get: (condition, done) => typeof condition == "object" ?
                model.findOne(condition, done) :
                model.findById(condition, done), // condition is _id

        update: (changes, done) => {{
            if (changes.{key})
                model.findOne({{ {key}: changes.{key} }}, (error, item) => {{
                    if (error) done && done(error);
                    else if (item) model.findOneAndUpdate({{ {key}: changes.{key} }}, {{ $set: changes }}, {{ new: true }}, done)
                    else done && done("{key} " + changes.{key} + " not found");
                }});
            else done && done("{key} " + changes.{key} + " not found");
        }},

        delete: (_id, done) => model.findById(_id, (error, item) => {{
            if (error) done(error);
            else if (item == null) done("Invalid Id!");
            else item.remove(done);
        }}),

        deleteMany: (condition, done) => model.deleteMany(condition, done),
    }};
}};
