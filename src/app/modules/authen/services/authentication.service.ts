import { AngularFireDatabase } from '@angular/fire/database';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, CanActivate } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

  private onLogin = new Subject<any>();
  onLogin$ = this.onLogin.asObservable();


  constructor(private angularFirebaseAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.angularFirebaseAuth.authState.subscribe((firebaseUser) => {
      if (firebaseUser) {
        let isAdmin = this.isUserAdmin(firebaseUser.uid);
        isAdmin.then(admin => {
          let user = { firebaseUser: firebaseUser, isAdmin: admin };
          localStorage.setItem('user', JSON.stringify(user));
        });
      } else {
        localStorage.setItem('user', '');
      }
    });
  }

  firebaseLogin(email: string, password: string): Promise<User> {

    return new Promise((resolve, reject) => {
      this.angularFirebaseAuth.signInWithEmailAndPassword(email, password).then(credentials => {
        let isAdmin = this.isUserAdmin(credentials.user?.uid);
        isAdmin.then(admin => {
          let user = { firebaseUser: credentials.user, isAdmin: admin };
          console.log("RESOLVED : " + admin);
          resolve(user);
          this.onLogin.next(user);
        })

      }).catch(error => {
        reject(error);
      });
    });
  }

  signup(email: string, password: string) {
    return this.angularFirebaseAuth.createUserWithEmailAndPassword(email, password);

  }

  firebaseLogout() {
    this.angularFirebaseAuth.signOut();
    localStorage.removeItem('user');

  }

  getCurrentUser(): User {
    let user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  canActivate(): Observable<boolean> {

    return this.angularFirebaseAuth.authState
      .pipe(
        map(user => {
          if (user) return true
          else {
            this.router.navigate(['/login']);
            console.log("allakseselida")
            return false

          }
        })
      )

  }

  private isUserAdmin(userID: string | undefined): Promise<boolean> {

    if (!userID) return new Promise((resolve, reject) => {
      resolve(false);
    });

    const rootRef = this.db.database.ref();
    const userRef = this.db.database.ref(('users/' + userID));

    if (!userRef.isEqual(rootRef)) {
      return new Promise((resolve, reject) => {
        userRef.on("value", function (snapshot) {
          if (snapshot.val()) {
            resolve(snapshot.val().isAdmin);
          } else {
            resolve(false);
          }
        }, function (errorObject: any) {
          console.log("The read failed: " + errorObject.code);
        });
      });

    }

    return new Promise((resolve, reject) => {
      resolve(false);
    });
  }

}




