import React from 'react';
import { ScrollView, StyleSheet } from 'react-native'
import { Paragraph } from 'react-native-paper'

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  content: {
    margin: 16
  },
  paragraph: {
    textAlign: 'justify',
    fontSize: 14
  }
})

export default function RegulationScreen(props) {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.margin}>
      <Paragraph style={styles.paragraph}>
        Cláusula 01- Da Abrangência Territorial e Validade: Esta promoção é válida em todo o território nacional, tendo vigência durante o período de 15/04/2019 a 11/05/2019, junto às lojas credenciadas a promoção SUA MÃE MERECE.
      </Paragraph>
      <Paragraph style={styles.paragraph}>
        Cláusula 02 – Dos Requisitos: Para participar da promoção SUA MÃE MERECE, o consumidor deverá, obrigatoriamente, comprar produtos ou serviços nas lojas credenciadas à promoção, sendo vedada a venda direta de tickets.
      </Paragraph>
      <Paragraph style={styles.paragraph}>
        Cláusula 03 – Do Procedimento Para Cadastramento: Ao adquirir produtos ou serviços em quaisquer das lojas participantes, deverá o consumidor solicitar ao vendedor ou caixa da loja o ticket correspondente à promoção.
          3.1. O consumidor deve baixar o APP PROMOTIC e realizar o cadastro com seus dados de identificação pessoal, sob pena de nulidade do ticket respectivo.
          3.2. Após o registro no app o consumidor deve escanear seu ticket para participar da promoção.
      </Paragraph>
      <Paragraph style={styles.paragraph}>
        Cláusula 04 - Dos Prêmios: Serão sorteados entre os consumidores participantes da promoção, separadamente, 01 (uma) Viagem para Buenos Aires/Argentina + hospedagem de 05(cinco) dias com direito a um acompanhante; 01 (uma) Moto Honda Bros, 160cc, 0 km; e 01 (uma) Geladeira Frost Free.
      </Paragraph>
      <Paragraph style={styles.paragraph}>
        Cláusula 05 - Do Sorteio: O sorteio será realizado no dia 12 de maio de 2019, na cidade de Cajazeiras/PB, na presença de testemunhas da CDL, SEBRAE e imprensa. A ferramenta utilizada para o sorteio será a plataforma PROMOTIC, que utiliza o algoritmo de embaralhamento FISHER-YATES, garantindo um sorteio justo e transparente.
          5.1. O resultado do sorteio será publicado no prazo máximo de 02 (dois) dias, nos principais veículos de comunicação da cidade de Cajazeiras/PB, e será afixado nas redes sociais e sites da campanha.
          5.2. Os participantes contemplados ou não, estarão sujeitos a ceder gratuitamente a SA Comunicação seus nomes, imagem e som de voz para fins de filmagem, fotografias e/ ou gravações, procedimentos que objetivam a divulgação dos resultados e das marcas envolvidas. Sendo que tal cessão se estende a todas as fases da promoção.
      </Paragraph>
      <Paragraph style={styles.paragraph}>
        Cláusula 06 - Da Entrega: Os prêmios serão entregues pela SA Comunicação no prazo de 30 (trinta) dias contados do sorteio; ressaltando-se que o direito ao prêmio prescreverá em 180 (cento e oitenta) dias, a contar da data prevista para o recebimento.
        6.1. No ato da entrega serão conferidos o ticket scaneado e o respectivo perfil cadastrado, para que o vencedor seja regularmente identificado. Se verificada qualquer fraude, o ticket será imediatamente inutilizado.
        6.2. Os prêmios são intransferíveis. O contemplado pode optar por receber o prêmio ou o equivalente em dinheiro, assinando recibo pelo bem resgatado.
        6.3. Na premiação não estão inclusas despesas de translado para aeroporto, emplacamento ou entrega;
      </Paragraph>
      <Paragraph style={styles.paragraph}>
        Cláusula 07 – Das Vedações: Só será válida a participação na promoção de pessoas físicas, sendo, portanto, proibida a participação de pessoas jurídicas.
        7.1. Os funcionários da SA COMUNICAÇÃO bem como os seus familiares de primeiro grau, não poderão participar da promoção.
        7.2. Os funcionários das empresas credenciadas à promoção SUA MÃE MERECE, não poderão participar da promoção pela empresa em que trabalham, se for constatado a participação o ticket será anulado.
        7.3. Em caso de consumidor sorteado menor de idade, o prémio somente poderá ser entregue a seu representante legal ou tutor, o qual deverá comprovar o vínculo mediante documento oficial ou sentença judicial competente.
        7.4. Só será válida uma única premiação por ticket.
      </Paragraph>
      <Paragraph style={styles.paragraph}>
        Cláusula 08 – Das Disposições Finais: Nem a Appel Inc. e a Google LLC possuem de forma alguma relação de patrocínio ou envolvimento com a promoção, sorteio ou empresa gestora da campanha.
      </Paragraph>
    </ScrollView>
  )
}
