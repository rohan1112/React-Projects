function Progress({ totalPoints, index, points, totalQue, answer }) {
  return (
    <div className="progress">
      <progress max={totalQue} value={index + Number(answer !== null)}>
        wdwda
      </progress>
      <p>
        Question <strong>{index + 1}</strong>/{totalQue}
      </p>
      <p>
        Points <strong>{points}</strong>/{totalPoints}
      </p>
    </div>
  );
}

export default Progress;
