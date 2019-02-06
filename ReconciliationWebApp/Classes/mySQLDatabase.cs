using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;
using System.IO;
using ReconciliationWebApp.Models;
using System.Configuration; 

namespace ReconciliationWebApp.Classes {
    public class mySQLDatabase {

        private MySqlConnection connection = null;
        private string connectionString;
        private string server;
        private string database;
        private string userid;
        private string password;
        private string system = "SYSTEM"; 
        

        public mySQLDatabase() {

            //Initialize the connection
            server = "";
            database = "";
            userid = "";
            password = "";
            connectionString = String.Format(@"server={0};database={1};userid={2};password={3};SslMode=none;", server, database, userid, password);
            
        }

        private void writeLog(string message) {

            //Initialise Log Writer 
            StreamWriter logWriter = new StreamWriter(@".\abc.txt", true);

            logWriter.WriteLine(message);

            logWriter.Close();

        }

        //Description : 
        public void insertRegistrationData(RegisterModel model) {


            try {
                //Open Connection 
                connection = new MySqlConnection(connectionString);

                connection.Open();

                //Set Variables
                string userTable = "recon_app_user";

                //Get ID
                string selectCountQuery = String.Format("SELECT COUNT(*) FROM {0}", userTable);

                MySqlCommand countCmd = new MySqlCommand(selectCountQuery, connection);

                MySqlDataReader countReader = countCmd.ExecuteReader();

                countReader.Read();

                int id = Convert.ToInt32(countReader.GetString(0)) + 1;

                countReader.Close();

                //Set other registration information 
                string username = model.newUserName;

                string email = model.newEmail;

                string password = model.newPassword.GetHashCode().ToString();

                string modifiedUser = system;

                string modifiedDateTime = DateTime.Today.ToString("MM/dd/yyyy HH:mm:ss");

                //Insert Information 

                string insertQuery = String.Format("INSERT INTO {0} (id , username, email, password, modified_user, modified_time) VALUES ({1}, '{2}', '{3}', '{4}', '{5}', '{6}')", userTable, id, username, email, password, modifiedUser, modifiedDateTime);

                MySqlCommand cmd = new MySqlCommand(insertQuery, connection);

                cmd.ExecuteNonQuery();

                connection.Close();


            } catch (MySqlException ex) {


                writeLog(ex.Message);

            } finally {

                if (connection != null) {

                    connection.Close();

                }



            }

            

        }


    }
}