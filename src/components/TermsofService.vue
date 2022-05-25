<template>
<div>
  <a-modal v-model="visible" :footer="false" width="860px" wrapClassName="termsofservice" :afterClose="closemodel" :centered="true">
    <template slot="closeIcon">
      <img src="../assets/image/Modalicon/close.svg" class="colseicon">
    </template>
     <div class="titile">Terms of Service</div>
     <div class="main-p">
       Welcome to https://anchorprotocol.com/, a website (“Site”) that provides access to https://app.anchorprotocol.com/, a website-hosted user interface (the “App”) (collectively referred to as the “Interface”) provided by Terraform Labs PTE, Ltd. (“Terra”, “we”, “our”, or “us”). The Interface provides access to a decentralized protocol on the Terra blockchain that allows suppliers and borrowers of certain digital assets to participate in autonomous interest rate markets (the “Protocol”).
       <br/><br/>
       THE INTERFACE IS A WEB APPLICATION WHICH MERELY PROVIDES A NON-EXCLUSIVE, PARTIAL USER INTERFACE TO THE PROTOCOL. THE OWNER/OPERATOR OF THE INTERFACE DOES NOT HAVE CUSTODY OVER YOUR ASSETS OR ACCESS TO YOUR PRIVATE KEY AND CANNOT INITIATE A TRANSFER OF DIGITAL ASSETS OR OTHERWISE ACCESS YOUR DIGITAL ASSETS. THE INTERFACE IS NOT A BROKER OR INTERMEDIARY AND IS IN NO WAY YOUR AGENT, ADVISOR, OR CUSTODIAN, AND WE DO NOT HAVE A FIDUCIARY RELATIONSHIP OR OBLIGATION TO YOU REGARDING ANY OTHER DECISIONS OR ACTIVITIES THAT YOU EFFECT WHEN USING YOUR WALLET OR OUR SERVICES. WE ARE NOT RESPONSIBLE FOR ANY ACTIVITIES THAT YOU ENGAGE IN WHEN USING YOUR WALLET, AND YOU SHOULD UNDERSTAND THE RISKS ASSOCIATED WITH PARTICIPATING IN DECENTRALIZED PROTOCOLS ON THE TERRA BLOCKCHAIN. UNLESS EXPLICITLY PROVIDED IN WRITING, WE DO NOT HOST OR MAINTAIN ECOSYSTEM PARTNERS ACCESSIBLE ON OUR SERVICES AND DO NOT PARTICIPATE IN ANY TRANSACTIONS ON SUCH ECOSYSTEM PARTNERS, RECOMMEND, ENDORSE, OR OTHERWISE TAKE A POSITION ON YOUR USE OF THESE SERVICES.
        <br/><br/>
       This Terms of Service Agreement (the “Terms” or “Agreement”) explains the terms and conditions by which you may access and use the Interface. Please read this Agreement carefully. This Agreement applies to you (“You”) as a user of the Interface, including all the products, services, tools, and information made available on app.anchorprotocol.com or on anchorprotocol.com. This Agreement contains a mandatory individual arbitration and class action/jury trial waiver provision that requires the use of arbitration on an individual basis to resolve disputes, rather than jury trials or class actions.
     </div>

    <div>
      <div class="title-2">1. Interface</div>
      <div class="main-p">
        The Interface provides access to a decentralized protocol on the Terra blockchain that allows suppliers and borrowers of digital assets to interact with the Protocol and transact using smart contracts (“Smart Contracts”).

        Using the Protocol may require that you pay a fee on the Terra network to perform a transaction. You acknowledge and agree that Terra has no control over any transactions, the method of payment of any transactions, or any actual payments of transactions. You must ensure that you have a sufficient balance to complete any transaction on the Protocol before initiating such transaction.

        You acknowledge and agree that Terra has no control over any transactions over the Protocol, the method of payment of any transactions or any actual payments of transactions. Accordingly, you must ensure that you have a sufficient balance of the applicable cryptocurrency tokens stored at your Anchor Protocol-compatible wallet address (“Cryptocurrency Wallet”) to complete any transaction on the Protocol or the Terra network before initiating such transaction.

        When used on this Interface, the terms “debt,” “lend,” “borrow,” “collateral”, “credit,” “leverage,” “bank”, “borrow”, “yield”, “invest” and other similar terms are not meant to be interpreted literally. Rather, such terms are being used to draw rough, fuzzy-logic analogies between the heavily automated and mostly deterministic operations of a decentralized-finance smart contract system and the discretionary performance of traditional-finance transactions by people. When the Interface is used by users to access the Protocol and transact using Smart Contracts, there are no legal agreements, promises of payment, or courts of law, and therefore there are no debts, loans, or other traditional finance transactions involved.
      </div>
    </div>

    <div>
      <div class="title-2">2. Interface</div>
      <div class="main-p">The Interface provides access to a decentralized protocol on the Terra blockchain that allows suppliers and borrowers of digital assets to interact with the Protocol and transact using smart contracts (“Smart Contracts”).

        Using the Protocol may require that you pay a fee on the Terra network to perform a transaction. You acknowledge and agree that Terra has no control over any transactions, the method of payment of any tr</div>

    </div>
  </a-modal>
</div>
</template>

<script>
export default {
  name: "TermsofService",
  data(){
    return{
      visible:true

    }

  },
  methods:{
    closemodel() {
      this.visible = false
      if (this.setShow) {
        this.setShow(false);
      }
    }

  }

}
</script>

<style scoped lang="scss">

.termsofservice{

  .colseicon{
    margin-top: 24px;

  }

  .titile{
    text-align: center;
    font-family: Inter;
    font-weight: 600;
    font-size: 32px;
    color: #1F2226;
margin: 50px 0px;
  }
  .title-2{
    margin: 50px 0px 20px 0px;
    font-family: Inter;
    font-weight: 700;
    font-size: 20px;
    color: #1F2226;

  }
  .main-p{
    font-family: Inter;
    font-weight: 400;
    font-size: 14px;
    color: #1F2226;

  }


}
::v-deep .ant-modal-content {
  border-radius: 36px;
}
</style>