import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import BackIcon from '../../../assets/icons/back.svg';
import SortIcon from '../../../assets/icons/sort.svg';
import Invoice from '../../../components/Invoice';
import MyStatusBar from '../../../components/MyStatusBar';
const MyInvoices = ({navigation}) => {
  const tw = useTailwind();
  const goBack = () => {
    navigation.goBack();
  };

  const getCurrentDate = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    return `${date}/${month}/${year}`;
  };
  const invoices = [
    {
      invoiceNumber: 'INV#1658416',
      invoiceAmount: 999,
      invoiceStatus: 'Completed',
      invoiceDate: getCurrentDate(),
    },
    {
      invoiceNumber: 'INV#1658416',
      invoiceAmount: 999,
      invoiceStatus: 'Completed',
      invoiceDate: getCurrentDate(),
    },
    {
      invoiceNumber: 'INV#1658416',
      invoiceAmount: 999,
      invoiceStatus: 'Completed',
      invoiceDate: getCurrentDate(),
    },
    {
      invoiceNumber: 'INV#1658416',
      invoiceAmount: 999,
      invoiceStatus: 'Completed',
      invoiceDate: getCurrentDate(),
    },
    {
      invoiceNumber: 'INV#1658416',
      invoiceAmount: 999,
      invoiceStatus: 'Completed',
      invoiceDate: getCurrentDate(),
    },
    {
      invoiceNumber: 'INV#1658416',
      invoiceAmount: 999,
      invoiceStatus: 'Completed',
      invoiceDate: getCurrentDate(),
    },
    {
      invoiceNumber: 'INV#1658416',
      invoiceAmount: 999,
      invoiceStatus: 'Completed',
      invoiceDate: getCurrentDate(),
    },
    {
      invoiceNumber: 'INV#1658416',
      invoiceAmount: 999,
      invoiceStatus: 'Completed',
      invoiceDate: getCurrentDate(),
    },
    {
      invoiceNumber: 'INV#1658416',
      invoiceAmount: 999,
      invoiceStatus: 'Completed',
      invoiceDate: getCurrentDate(),
    },
    {
      invoiceNumber: 'INV#1658416',
      invoiceAmount: 999,
      invoiceStatus: 'Completed',
      invoiceDate: getCurrentDate(),
    },
    {
      invoiceNumber: 'INV#1658416',
      invoiceAmount: 999,
      invoiceStatus: 'Completed',
      invoiceDate: getCurrentDate(),
    },
    {
      invoiceNumber: 'INV#1658416',
      invoiceAmount: 999,
      invoiceStatus: 'Completed',
      invoiceDate: getCurrentDate(),
    },
    {
      invoiceNumber: 'INV#1658416',
      invoiceAmount: 999,
      invoiceStatus: 'Completed',
      invoiceDate: getCurrentDate(),
    },
  ];
  return (
    <View style={[tw('h-full px-5'), styles.container]}>
      <MyStatusBar padding={50} />
      <View
        style={[tw('flex  flex-row items-center justify-between my-3'), {}]}>
        <View style={[tw('flex flex-row items-center flex-1')]}>
          <TouchableOpacity onPress={goBack}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={[tw('font-bold ml-3'), styles.header]}>My Invoices</Text>
        </View>
        <SortIcon />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Text style={[tw('font-medium mt-3'), styles.subheader]}>
          Payment Settings
        </Text>
        {invoices.map((invoice, index) => {
          return <Invoice data={invoice} key={index} />;
        })}
        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
};

export default MyInvoices;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  subheader: {color: Colors.dullwhite, fontSize: 15, lineHeight: 18},
});
