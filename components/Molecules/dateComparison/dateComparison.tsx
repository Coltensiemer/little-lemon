import { StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Button, Divider, Text } from 'react-native-paper';

export function dateComparison(reservation: Array<any>) {
  if (reservation.length === 0) return [];

  const today = new Date();
  const currentDate = today.toISOString();

  const comparisonResults = reservation.map((res) => {
      const reservationDate = new Date(res.date);
      
      if (reservationDate < today) {
          return "Past"; // Reservation has happened in the past
      } else if (reservationDate > today) {
          return "Future"; // Reservation is in the future
      } else {
          return "Today"; // Reservation is for the current day
      }
  });

  return comparisonResults;
}