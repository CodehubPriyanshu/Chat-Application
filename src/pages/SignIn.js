import React from 'react';
import firebase from 'firebase/app';
import { Container, Grid, Row, Panel, Col, Button, Icon, Alert } from 'rsuite';
import { auth, database } from '../misc/firebase';

const SignIn = () => {
  const signInWithProvider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

      if (additionalUserInfo?.isNewUser && user) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName || 'Anonymous User',
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success('Signed in successfully', 4000);
    } catch (err) {
      console.error('Sign in error:', err);
      
      let errorMessage = 'Failed to sign in. Please try again.';
      
      if (err.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign in was cancelled.';
      } else if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked. Please allow popups and try again.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      Alert.error(errorMessage, 4000);
    }
  };

  const onFacebookSignIn = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };

  const onGoogleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat</h2>
                <p>Progressive chat platform for neophytes</p>
              </div>

              <div className="mt-3">
                <Button block color="blue" onClick={onFacebookSignIn}>
                  <Icon icon="facebook" /> Continue with Facebook
                </Button>

                <Button block color="green" onClick={onGoogleSignIn}>
                  <Icon icon="google" /> Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;