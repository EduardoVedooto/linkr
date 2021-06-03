export default function Round(n) {

    if (n % 10 === 0) return n;

    else return (parseInt(n / 10) * 10) + 10;

}
