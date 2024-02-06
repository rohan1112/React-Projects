import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdrawl(state, action) {
      if (action.payload > state.balance) {
        alert("Overdraft! Your remaining amount is " + state.balance);
        return;
      } else {
        state.balance -= action.payload;
      }
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        // set the purpose of the loan
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    converting(state) {
      state.isLoading = true;
    },
  },
});

console.log(accountSlice);

export const { withdrawl, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch) {
    dispatch({ type: "account/converting" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    dispatch({
      type: "account/deposit",
      payload: converted,
    });
  };
}

export default accountSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "amount/deposit":
//       return {
//         ...state,
//         balance: state.balance + Number(action.payload),
//         isLoading: false,
//       };
//     case "amount/withdrawl":
//       return { ...state, balance: state.balance - action.payload };
//     case "amount/requestLoan":
//       if (state.loan > 0) return;
//       return {
//         ...state,
//         loan: state.loan + action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "amount/payLoan":
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: 0,
//         loanPurpose: "",
//       };

//     case "amount/converting":
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "amount/deposit", payload: amount };

//   return async function (dispatch) {
//     dispatch({ type: "amount/converting" });
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const converted = data.rates.USD;
//     dispatch({
//       type: "amount/deposit",
//       payload: converted,
//     });
//   };
// }
// export function withdrawl(amount) {
//   return { type: "amount/withdrawl", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: "amount/requestLoan",
//     payload: { amount: amount, purpose: purpose },
//   };
// }

// export function payLoan(amount) {
//   return { type: "amount/payLoan", payload: amount };
// }
