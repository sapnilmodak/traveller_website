const PackageInit = require('./Package');
const ActivityInit = require('./Activity');
const BlogInit = require('./Blog');
const CabInit = require('./Cab');
const ContactInit = require('./Contact');
const EnquiryInit = require('./Enquiry');
const HotelInit = require('./Hotel');
const RentalInit = require('./Rental');
const TeamInit = require('./Team');
const UserInit = require('./User');
const AdminInit = require('./Admin');

let models = {};

const initModels = () => {
  models.Package = PackageInit();
  models.Activity = ActivityInit();
  models.Blog = BlogInit();
  models.Cab = CabInit();
  models.Contact = ContactInit();
  models.Enquiry = EnquiryInit();
  models.Hotel = HotelInit();
  models.Rental = RentalInit();
  models.Team = TeamInit();
  models.User = UserInit();
  models.Admin = AdminInit();

  return models;
};

const getModels = () => models;

module.exports = { initModels, getModels };
