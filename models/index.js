const User = require('./User');
const Project = require('./Project');
const Text = require('./Text');
User.hasMany(Text, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Project.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Project, Text };
